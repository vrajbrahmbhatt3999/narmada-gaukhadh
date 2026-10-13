import { MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/config/products'

export function WhatsAppFloat() {
  if (!SITE_CONFIG.whatsappNumber) return null

  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Order or enquire on WhatsApp"
    >
      <MessageCircle size={24} fill="white" />
    </a>
  )
}
