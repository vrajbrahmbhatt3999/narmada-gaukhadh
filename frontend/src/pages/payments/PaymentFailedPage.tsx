import { useSearchParams, Link } from 'react-router-dom'
import { XCircle, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/config/products'

export function PaymentFailedPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId') ?? params.get('txnid')
  const reason = params.get('error') ?? params.get('field9')

  return (
    <div className="section">
      <div className="container flex flex-col items-center justify-center text-center py-16 max-w-lg">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full mb-6"
          style={{ background: 'rgba(192,57,43,0.08)' }}
        >
          <XCircle size={44} style={{ color: 'var(--color-error)' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-error)' }}>
          Payment Failed
        </h1>

        <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.9375rem' }}>
          Your payment could not be processed. No amount has been charged. Please try again or choose WhatsApp ordering.
        </p>

        {reason && (
          <div
            className="px-5 py-3 rounded-xl mb-4 text-sm w-full"
            style={{ background: 'rgba(192,57,43,0.05)', border: '1px solid rgba(192,57,43,0.15)' }}
          >
            <span style={{ color: 'var(--color-muted)' }}>Reason: </span>
            <span style={{ color: 'var(--color-error)' }}>{reason}</span>
          </div>
        )}

        {orderId && (
          <div
            className="px-5 py-3 rounded-xl mb-6 text-sm w-full"
            style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
          >
            <span style={{ color: 'var(--color-muted)' }}>Order reference: </span>
            <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{orderId}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link to="/checkout" className="btn btn-primary flex-1">Try Again</Link>
          {SITE_CONFIG.whatsappNumber && (
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp flex-1"
            >
              <MessageCircle size={16} />
              Order on WhatsApp
            </a>
          )}
        </div>

        <Link to="/contact" style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--color-muted)' }} className="hover:text-forest transition-colors">
          Contact support
        </Link>
      </div>
    </div>
  )
}
