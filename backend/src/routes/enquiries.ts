import type { FastifyInstance } from 'fastify'
import { prisma } from '../services/db.js'

interface EnquiryBody {
  name: string
  phone: string
  product: string
  quantity: string
  message?: string
}

export async function enquiryRoutes(app: FastifyInstance) {
  app.post<{ Body: EnquiryBody }>(
    '/api/enquiries',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'phone', 'product', 'quantity'],
          properties: {
            name: { type: 'string', maxLength: 200 },
            phone: { type: 'string', pattern: '^[6-9]\\d{9}$' },
            product: { type: 'string', maxLength: 200 },
            quantity: { type: 'string', maxLength: 200 },
            message: { type: 'string', maxLength: 2000 },
          },
        },
      },
    },
    async (req, reply) => {
      const { name, phone, product, quantity, message } = req.body

      await prisma.enquiry.create({
        data: { name, phone, product, quantity, message: message ?? null },
      })

      return reply.code(201).send({ success: true, message: 'Enquiry received. We will contact you shortly.' })
    }
  )
}
