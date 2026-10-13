// WhatsApp utility — all business logic for generating order links

import { SITE_CONFIG, formatPrice } from '@/config/products'

interface WhatsAppOrderPayload {
  productName: string
  variantLabel: string
  quantity: number
  pricePerUnit: number
  totalPrice: number
  customerName?: string
  deliveryAddress?: string
  phone?: string
}

interface WhatsAppEnquiryPayload {
  name: string
  phone: string
  product: string
  quantity: string
  message: string
}

export function buildWhatsAppOrderUrl(items: WhatsAppOrderPayload[]): string {
  const number = SITE_CONFIG.whatsappNumber
  if (!number) {
    return '#whatsapp-not-configured'
  }

  const lines: string[] = [
    '🌿 *New Order — Narmada Gaukhadh*',
    '─────────────────────',
  ]

  items.forEach((item, i) => {
    lines.push(
      `*Item ${i + 1}:* ${item.productName}`,
      `Pack: ${item.variantLabel}`,
      `Qty: ${item.quantity}`,
      `Price: ${formatPrice(item.pricePerUnit)} × ${item.quantity} = ${formatPrice(item.totalPrice)}`
    )
    if (i < items.length - 1) lines.push('─────────────────────')
  })

  const grandTotal = items.reduce((sum, i) => sum + i.totalPrice, 0)
  lines.push('─────────────────────', `*Order Total: ${formatPrice(grandTotal)}*`)

  if (items[0]?.customerName) {
    lines.push('', `Name: ${items[0].customerName}`)
  }
  if (items[0]?.phone) {
    lines.push(`Phone: ${items[0].phone}`)
  }
  if (items[0]?.deliveryAddress) {
    lines.push(`Address: ${items[0].deliveryAddress}`)
  }

  lines.push(
    '',
    '_Note: This is an enquiry, not a confirmed paid order. Payment details will be shared separately._'
  )

  const message = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${number}?text=${message}`
}

export function buildWhatsAppEnquiryUrl(payload: WhatsAppEnquiryPayload): string {
  const number = SITE_CONFIG.whatsappNumber
  if (!number) {
    return '#whatsapp-not-configured'
  }

  const lines = [
    '🌿 *Bulk Enquiry — Narmada Gaukhadh*',
    '─────────────────────',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Product: ${payload.product}`,
    `Quantity Required: ${payload.quantity}`,
    `Message: ${payload.message}`,
  ]

  const message = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${number}?text=${message}`
}

export function openWhatsApp(url: string): void {
  if (url === '#whatsapp-not-configured') {
    alert('WhatsApp ordering is not yet configured. Please contact us directly.')
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}
