import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export function PaymentSuccessPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId') ?? params.get('txnid')

  return (
    <div className="section">
      <div className="container flex flex-col items-center justify-center text-center py-16 max-w-lg">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full mb-6"
          style={{ background: 'rgba(45,122,79,0.1)' }}
        >
          <CheckCircle size={44} style={{ color: 'var(--color-success)' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-success)' }}>
          Payment Successful!
        </h1>

        <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.9375rem' }}>
          Your payment has been received and your order is being processed. You will receive a confirmation on the mobile number and email you provided.
        </p>

        {orderId && (
          <div
            className="px-5 py-3 rounded-xl mb-6 text-sm"
            style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
          >
            <span style={{ color: 'var(--color-muted)' }}>Order reference: </span>
            <span style={{ fontWeight: 700, color: 'var(--color-forest)', fontFamily: 'monospace' }}>{orderId}</span>
          </div>
        )}

        <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontStyle: 'italic', marginBottom: '2rem' }}>
          Note: Payment confirmation is pending server verification. If you do not receive confirmation within 24 hours, please contact us with your order reference.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link to="/shop" className="btn btn-primary flex-1">Continue Shopping</Link>
          <Link to="/contact" className="btn btn-secondary flex-1">Contact Support</Link>
        </div>
      </div>
    </div>
  )
}
