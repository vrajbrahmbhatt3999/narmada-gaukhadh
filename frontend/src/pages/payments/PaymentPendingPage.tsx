import { useSearchParams, Link } from 'react-router-dom'
import { Clock, RefreshCw } from 'lucide-react'

export function PaymentPendingPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId') ?? params.get('txnid')

  return (
    <div className="section">
      <div className="container flex flex-col items-center justify-center text-center py-16 max-w-lg">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full mb-6"
          style={{ background: 'rgba(212,135,10,0.1)' }}
        >
          <Clock size={44} style={{ color: 'var(--color-warning)' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-warning)' }}>
          Payment Pending
        </h1>

        <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.9375rem' }}>
          Your payment is being verified. This can take a few minutes. Please do not close this tab or refresh.
        </p>

        {orderId && (
          <div
            className="px-5 py-3 rounded-xl mb-6 text-sm"
            style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
          >
            <span style={{ color: 'var(--color-muted)' }}>Order reference: </span>
            <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{orderId}</span>
          </div>
        )}

        <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontStyle: 'italic', marginBottom: '2rem' }}>
          If your payment is not confirmed within 30 minutes, please contact us with your order reference. Amounts are not debited for failed or pending transactions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            className="btn btn-secondary flex-1"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} />
            Check Status
          </button>
          <Link to="/contact" className="btn btn-primary flex-1">Contact Support</Link>
        </div>
      </div>
    </div>
  )
}
