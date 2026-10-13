import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_DATA = [
  {
    q: 'How do I place an order?',
    a: 'You can add products to your cart and checkout with PayU payment, or tap "Order on WhatsApp" to send us a message directly. We will confirm your order and provide payment details.',
  },
  {
    q: 'What payment methods do you accept?',
    a: '[PLACEHOLDER: Confirm accepted payment methods before launch — e.g., UPI, debit/credit card via PayU, WhatsApp-coordinated bank transfer.]',
  },
  {
    q: 'How long does delivery take?',
    a: '[PLACEHOLDER: Delivery timelines must be confirmed by the business before publishing. Do not advertise specific timelines without confirmation.]',
  },
  {
    q: 'Do you offer free delivery?',
    a: `Free delivery may be available on orders above ₹${999}. [Confirm free-delivery threshold and applicable pincodes with the business before launch.]`,
  },
  {
    q: 'What pack sizes are available for vermicompost?',
    a: 'Narmada Gaukhadh Vermicompost is currently available in 1 kg, 5 kg, and 25 kg packs. Prices shown are placeholder values and must be confirmed before launch.',
  },
  {
    q: 'What pack sizes are available for Vidhyanchal?',
    a: 'Vidhyanchal is available in 500 ml, 1 litre, 5 litres, and 20 litres. Prices shown are placeholder values and must be confirmed before launch.',
  },
  {
    q: 'Can I return or cancel my order?',
    a: '[PLACEHOLDER: Return and cancellation policy must be confirmed with the business. Please read the Cancellation & Refund Policy page for details.]',
  },
  {
    q: 'Do you offer bulk quantities for farmers or dealers?',
    a: 'Yes! We welcome bulk enquiries from farmers, agricultural distributors, and dealers. Please use the Contact page or WhatsApp to send us your requirements.',
  },
  {
    q: 'How should I apply vermicompost?',
    a: '[PLACEHOLDER: Application instructions must be confirmed and verified by the business before publishing. Please follow the usage instructions supplied with your order.]',
  },
  {
    q: 'How should I apply Vidhyanchal?',
    a: '[PLACEHOLDER: Application method, dilution ratio, and crop suitability for Vidhyanchal must be confirmed by the business before publishing.]',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '0.875rem',
        background: 'white',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        boxShadow: open ? 'var(--shadow-card)' : 'none',
      }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span style={{ fontWeight: 600, fontSize: '0.9375rem', paddingRight: '1rem', color: 'var(--color-dark)' }}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0, color: 'var(--color-forest)' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div
              style={{
                padding: '0 1.25rem 1.25rem',
                fontSize: '0.9rem',
                color: 'var(--color-muted)',
                lineHeight: 1.7,
                borderTop: '1px solid var(--color-border)',
                paddingTop: '1rem',
              }}
            >
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqSection() {
  return (
    <section className="section" id="faq" aria-label="Frequently asked questions">
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', width: '1.5rem', height: '2px', background: 'var(--color-leaf)', borderRadius: '2px' }} />
            FAQs
          </p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about our products, ordering, and delivery.
          </p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {FAQ_DATA.map(({ q, a }) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
