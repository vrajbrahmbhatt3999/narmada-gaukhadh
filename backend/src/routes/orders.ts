import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/db.js'
import { calculateOrder } from '../config/products.js'
import { buildPayUFormData } from '../services/payu.js'
import { verifyPayUResponseHash } from '../services/payu.js'
import crypto from 'crypto'

function generateOrderRef(): string {
  const date = new Date()
  const yy = date.getFullYear().toString().slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase()
  return `NG-${yy}${mm}-${rand}`
}

function generateTxnId(): string {
  return `NG-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
}

interface OrderItemInput {
  productId: string
  variantId: string
  quantity: number
}

interface CustomerInput {
  name: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
}

export async function orderRoutes(app: FastifyInstance) {
  // POST /api/orders — create order (used before payment)
  app.post<{ Body: { items: OrderItemInput[]; customer: CustomerInput } }>(
    '/api/orders',
    {
      schema: {
        body: {
          type: 'object',
          required: ['items', 'customer'],
          properties: {
            items: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                required: ['productId', 'variantId', 'quantity'],
                properties: {
                  productId: { type: 'string' },
                  variantId: { type: 'string' },
                  quantity: { type: 'integer', minimum: 1, maximum: 999 },
                },
              },
            },
            customer: {
              type: 'object',
              required: ['name', 'email', 'phone', 'addressLine1', 'city', 'state', 'pincode'],
              properties: {
                name: { type: 'string', maxLength: 200 },
                email: { type: 'string', format: 'email' },
                phone: { type: 'string', pattern: '^[6-9]\\d{9}$' },
                addressLine1: { type: 'string', maxLength: 300 },
                addressLine2: { type: 'string', maxLength: 300 },
                city: { type: 'string', maxLength: 100 },
                state: { type: 'string', maxLength: 100 },
                pincode: { type: 'string', pattern: '^\\d{6}$' },
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { items, customer } = req.body

      const calculation = calculateOrder(items)
      if (!calculation) {
        return reply.code(400).send({ error: 'Invalid product or variant in order.' })
      }

      const order = await prisma.order.create({
        data: {
          orderRef: generateOrderRef(),
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          addressLine1: customer.addressLine1,
          addressLine2: customer.addressLine2 ?? null,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
          subtotal: calculation.subtotalInPaise,
          deliveryCharge: calculation.deliveryChargeInPaise,
          totalAmount: calculation.totalInPaise,
          items: {
            create: calculation.lines.map((l) => ({
              productId: l.productId,
              productName: l.productName,
              variantId: l.variantId,
              variantLabel: l.variantLabel,
              sku: l.sku,
              quantity: l.quantity,
              unitPrice: l.unitPriceInPaise,
              lineTotal: l.lineTotalInPaise,
            })),
          },
        },
      })

      return reply.code(201).send({
        orderId: order.id,
        orderRef: order.orderRef,
        status: order.status,
        totalAmount: order.totalAmount / 100, // return INR for display
      })
    }
  )

  // GET /api/orders/:id/status — secure order status by orderRef token
  app.get<{ Params: { id: string } }>(
    '/api/orders/:id/status',
    async (req, reply) => {
      const order = await prisma.order.findFirst({
        where: {
          OR: [{ id: req.params.id }, { orderRef: req.params.id }],
        },
        select: {
          orderRef: true,
          status: true,
          totalAmount: true,
          createdAt: true,
        },
      })

      if (!order) {
        return reply.code(404).send({ error: 'Order not found' })
      }

      return reply.send({
        orderRef: order.orderRef,
        status: order.status,
        totalAmount: order.totalAmount / 100,
        createdAt: order.createdAt,
      })
    }
  )
}

export async function paymentRoutes(app: FastifyInstance) {
  const baseUrl = process.env.BACKEND_BASE_URL ?? 'http://localhost:4000'
  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000'

  // POST /api/payments/payu/initiate
  app.post<{ Body: { items: OrderItemInput[]; customer: CustomerInput } }>(
    '/api/payments/payu/initiate',
    {
      schema: {
        body: {
          type: 'object',
          required: ['items', 'customer'],
          properties: {
            items: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                required: ['productId', 'variantId', 'quantity'],
                properties: {
                  productId: { type: 'string' },
                  variantId: { type: 'string' },
                  quantity: { type: 'integer', minimum: 1 },
                },
              },
            },
            customer: {
              type: 'object',
              required: ['name', 'email', 'phone', 'addressLine1', 'city', 'state', 'pincode'],
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { items, customer } = req.body

      // Server-side price calculation — never trust frontend amounts
      const calculation = calculateOrder(items)
      if (!calculation) {
        return reply.code(400).send({ error: 'Invalid product or variant.' })
      }

      // Check PayU credentials are configured
      if (!process.env.PAYU_KEY || !process.env.PAYU_SALT) {
        return reply.code(503).send({
          error: 'Payment gateway is not configured. Please use WhatsApp ordering instead.',
          code: 'PAYU_NOT_CONFIGURED',
        })
      }

      // Create pending order in DB
      const order = await prisma.order.create({
        data: {
          orderRef: generateOrderRef(),
          status: 'PENDING_PAYMENT',
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          addressLine1: customer.addressLine1,
          addressLine2: customer.addressLine2 ?? null,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
          subtotal: calculation.subtotalInPaise,
          deliveryCharge: calculation.deliveryChargeInPaise,
          totalAmount: calculation.totalInPaise,
          items: {
            create: calculation.lines.map((l) => ({
              productId: l.productId,
              productName: l.productName,
              variantId: l.variantId,
              variantLabel: l.variantLabel,
              sku: l.sku,
              quantity: l.quantity,
              unitPrice: l.unitPriceInPaise,
              lineTotal: l.lineTotalInPaise,
            })),
          },
        },
      })

      const txnId = generateTxnId()

      // Create payment record
      await prisma.paymentRecord.create({
        data: {
          orderId: order.id,
          txnId,
          status: 'INITIATED',
          amount: calculation.totalInPaise,
        },
      })

      const productInfo = calculation.lines
        .map((l) => `${l.productName} (${l.variantLabel} x${l.quantity})`)
        .join(', ')

      const { payuUrl, formData } = buildPayUFormData({
        txnid: txnId,
        amountInPaise: calculation.totalInPaise,
        productinfo: productInfo.slice(0, 100), // PayU max length
        firstname: customer.name.split(' ')[0],
        email: customer.email,
        phone: customer.phone,
        surl: `${baseUrl}/api/payments/payu/success`,
        furl: `${baseUrl}/api/payments/payu/failure`,
        orderId: order.id,
      })

      return reply.send({ payuUrl, formData })
    }
  )

  // POST /api/payments/payu/success — PayU success callback
  app.post('/api/payments/payu/success', async (req, reply) => {
    const body = req.body as Record<string, string>
    const {
      txnid, status, hash, key, amount, productinfo, firstname, email,
      udf1: orderId, mihpayid, mode, bank_ref_num, field9
    } = body

    // 1. Verify hash
    if (!verifyPayUResponseHash({ key, txnid, amount, productinfo, firstname, email, status, hash })) {
      app.log.warn({ txnid }, 'PayU success callback: hash verification FAILED')
      return reply.redirect(`${frontendUrl}/payment/failed?txnid=${txnid}&error=hash_mismatch`)
    }

    // 2. Verify status
    if (status !== 'success') {
      return reply.redirect(`${frontendUrl}/payment/failed?txnid=${txnid}`)
    }

    // 3. Find and verify order
    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) {
      app.log.warn({ orderId, txnid }, 'PayU success: order not found')
      return reply.redirect(`${frontendUrl}/payment/failed?txnid=${txnid}&error=order_not_found`)
    }

    // 4. Verify amount matches (allow ±1 paise for floating-point)
    const receivedAmountPaise = Math.round(parseFloat(amount) * 100)
    if (Math.abs(receivedAmountPaise - order.totalAmount) > 1) {
      app.log.error({ orderId, expected: order.totalAmount, received: receivedAmountPaise }, 'PayU: amount mismatch')
      return reply.redirect(`${frontendUrl}/payment/failed?txnid=${txnid}&error=amount_mismatch`)
    }

    // 5. Idempotent update — only update if not already marked paid
    await prisma.$transaction([
      prisma.paymentRecord.updateMany({
        where: { txnId: txnid },
        data: {
          status: 'SUCCESS',
          payuOrderId: mihpayid,
          paymentMode: mode,
          bankRefNum: bank_ref_num ?? null,
          // Store sanitized response (no card data)
          payuResponse: {
            txnid, status, mihpayid, mode, bank_ref_num, field9,
            amount, productinfo, firstname, email,
          },
        },
      }),
      prisma.order.updateMany({
        where: { id: orderId, status: 'PENDING_PAYMENT' },
        data: { status: 'PAID' },
      }),
    ])

    return reply.redirect(`${frontendUrl}/payment/success?orderId=${orderId}`)
  })

  // POST /api/payments/payu/failure — PayU failure callback
  app.post('/api/payments/payu/failure', async (req, reply) => {
    const body = req.body as Record<string, string>
    const { txnid, udf1: orderId, field9 } = body

    await prisma.paymentRecord.updateMany({
      where: { txnId: txnid },
      data: { status: 'FAILURE' },
    })

    if (orderId) {
      await prisma.order.updateMany({
        where: { id: orderId, status: 'PENDING_PAYMENT' },
        data: { status: 'PAYMENT_FAILED' },
      })
    }

    const errorReason = encodeURIComponent(field9 ?? 'Payment failed')
    return reply.redirect(`${frontendUrl}/payment/failed?txnid=${txnid}&error=${errorReason}`)
  })
}
