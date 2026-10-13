import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, ShoppingCart } from 'lucide-react'
import { PRODUCTS, formatPrice } from '@/config/products'
import { useCart } from '@/features/cart/CartContext'
import { buildWhatsAppOrderUrl, openWhatsApp } from '@/lib/whatsapp'

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const { addItem } = useCart()
  const defaultVariant = product.variants[0]

  return (
    <article className="card group" aria-label={product.name}>
      {/* Image */}
      <div
        style={{
          aspectRatio: '3/2',
          background: `linear-gradient(135deg, ${product.category === 'solid' ? '#8A6246, #56834D' : '#214E34, #56834D'})`,
          borderRadius: '1.25rem 1.25rem 0 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span style={{ fontSize: '4rem', opacity: 0.25 }}>
              {product.category === 'solid' ? '🌱' : '💧'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
              [Product image placeholder]
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-forest)', fontSize: '0.7rem' }}>
            {product.category === 'solid' ? 'Solid Fertiliser' : 'Liquid Product'}
          </span>
        </div>
      </div>

      <div className="card-body flex flex-col h-full">
        <p style={{ fontFamily: 'var(--font-gujarati)', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          {product.nameGujarati}
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', marginBottom: '0.5rem' }}>
          {product.name}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: 1.65, marginBottom: '1rem', flexGrow: 1 }}>
          {product.shortDescription}
        </p>

        {/* Pack sizes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.variants.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm"
              style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
            >
              <span style={{ fontWeight: 500 }}>{v.label}</span>
              <span style={{ marginLeft: '0.5rem', color: 'var(--color-forest)', fontWeight: 700 }}>
                {formatPrice(v.priceInr)}
              </span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>
          *Prices are temporary placeholders — confirm before launch
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/products/${product.slug}`} className="btn btn-primary flex-1 btn-sm">
            View Product <ArrowRight size={15} />
          </Link>
          <button
            className="btn btn-icon btn-sm"
            style={{ border: '1.5px solid var(--color-border)', background: 'white', flexShrink: 0 }}
            onClick={() =>
              addItem({
                productId: product.id,
                productName: product.name,
                variantId: defaultVariant.id,
                variantLabel: defaultVariant.label,
                sku: defaultVariant.sku,
                quantity: 1,
                pricePerUnit: defaultVariant.priceInr,
              })
            }
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={16} style={{ color: 'var(--color-forest)' }} />
          </button>
          <button
            className="btn btn-icon btn-sm btn-whatsapp"
            style={{ flexShrink: 0 }}
            onClick={() => {
              const url = buildWhatsAppOrderUrl([
                {
                  productName: product.name,
                  variantLabel: defaultVariant.label,
                  quantity: 1,
                  pricePerUnit: defaultVariant.priceInr,
                  totalPrice: defaultVariant.priceInr,
                },
              ])
              openWhatsApp(url)
            }}
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <MessageCircle size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}

export function ShopPage() {
  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-forest-dark) 0%, var(--color-forest) 100%)',
          padding: '4rem 0 3rem',
        }}
      >
        <div className="container text-center">
          <p className="section-tag" style={{ color: 'rgba(168,213,162,0.9)', justifyContent: 'center' }}>Shop</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '0.75rem' }}>
            Our Products
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>
            Natural agricultural products made with traditional Panchagavya inputs for sustainable farming.
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="section">
        <div className="container">
          <div
            className="inline-block px-4 py-2 rounded-lg text-sm mb-8"
            style={{ background: 'rgba(33,78,52,0.06)', color: 'var(--color-forest)', border: '1px solid rgba(33,78,52,0.12)', fontStyle: 'italic' }}
          >
            ⚠️ All prices shown are temporary placeholders. Final prices must be confirmed by the business before accepting real orders.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bulk enquiry CTA */}
          <div
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ background: 'var(--color-cream-dark)', border: '1px solid var(--color-border)' }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Need Larger Quantities?
            </h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
              We welcome bulk orders from farmers, co-operatives, and agricultural dealers. Get in touch for custom pricing.
            </p>
            <Link to="/contact#bulk" className="btn btn-primary">
              <MessageCircle size={16} />
              Send Bulk Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
