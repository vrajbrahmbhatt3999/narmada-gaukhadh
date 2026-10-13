import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/config/products'

export function ContactSection() {
  return (
    <section
      className="section"
      id="contact"
      aria-label="Contact us"
      style={{ background: 'white' }}
    >
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', width: '1.5rem', height: '2px', background: 'var(--color-leaf)', borderRadius: '2px' }} />
            Get in Touch
          </p>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle mx-auto">
            Have a question about our products or want to place a bulk order? We'd love to hear from you.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto mb-10"
        >
          {[
            {
              icon: MessageCircle,
              label: 'WhatsApp',
              value: SITE_CONFIG.whatsappNumber
                ? `+${SITE_CONFIG.whatsappNumber}`
                : '[WhatsApp number not configured]',
              href: SITE_CONFIG.whatsappNumber
                ? `https://wa.me/${SITE_CONFIG.whatsappNumber}`
                : undefined,
              color: '#25D366',
            },
            {
              icon: Phone,
              label: 'Phone',
              value: SITE_CONFIG.phone || '[Phone not configured]',
              href: SITE_CONFIG.phone ? `tel:${SITE_CONFIG.phone}` : undefined,
              color: 'var(--color-forest)',
            },
            {
              icon: Mail,
              label: 'Email',
              value: SITE_CONFIG.email || '[Email not configured]',
              href: SITE_CONFIG.email ? `mailto:${SITE_CONFIG.email}` : undefined,
              color: 'var(--color-earth)',
            },
            {
              icon: MapPin,
              label: 'Location',
              value: SITE_CONFIG.address
                ? `${SITE_CONFIG.address}, ${SITE_CONFIG.city}, ${SITE_CONFIG.state}`
                : `${SITE_CONFIG.state}, ${SITE_CONFIG.country}`,
              href: undefined,
              color: 'var(--color-leaf)',
            },
          ].map(({ icon: Icon, label, value, href, color }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center p-5 rounded-2xl"
              style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                style={{ background: `${color}18` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted)', marginBottom: '0.375rem' }}>
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ fontSize: '0.875rem', color: 'var(--color-dark)', fontWeight: 500 }}
                  className="hover:text-forest transition-colors"
                >
                  {value}
                </a>
              ) : (
                <span style={{ fontSize: '0.875rem', color: value.startsWith('[') ? 'var(--color-muted)' : 'var(--color-dark)', fontStyle: value.startsWith('[') ? 'italic' : 'normal' }}>
                  {value}
                </span>
              )}
            </div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link to="/contact" className="btn btn-primary">
            Send Us a Message
          </Link>
        </div>
      </div>
    </section>
  )
}
