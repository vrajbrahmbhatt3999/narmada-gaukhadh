import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="section">
      <div className="container flex flex-col items-center justify-center text-center py-20">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full mb-6"
          style={{ background: 'rgba(33,78,52,0.07)' }}
        >
          <Leaf size={36} style={{ color: 'var(--color-forest)' }} />
        </div>

        <p style={{ fontWeight: 700, fontSize: '5rem', lineHeight: 1, color: 'var(--color-cream-dark)', marginBottom: '0.5rem' }}>
          404
        </p>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', maxWidth: '360px' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="btn btn-primary">Go to Home</Link>
          <Link to="/shop" className="btn btn-secondary">Browse Products</Link>
        </div>
      </div>
    </div>
  )
}
