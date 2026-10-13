import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ShoppingCart, MessageCircle, ArrowLeft, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS, getProductBySlug, formatPrice } from '@/config/products'
import { useCart } from '@/features/cart/CartContext'
import { buildWhatsAppOrderUrl, openWhatsApp } from '@/lib/whatsapp'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  const { addItem } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id ?? ''
  )
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]

  const lineTotal = selectedVariant.priceInr * quantity

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      variantId: selectedVariant.id,
      variantLabel: selectedVariant.label,
      sku: selectedVariant.sku,
      quantity,
      pricePerUnit: selectedVariant.priceInr,
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  const handleWhatsApp = () => {
    const url = buildWhatsAppOrderUrl([
      {
        productName: product.name,
        variantLabel: selectedVariant.label,
        quantity,
        pricePerUnit: selectedVariant.priceInr,
        totalPrice: lineTotal,
      },
    ])
    openWhatsApp(url)
  }

  const relatedProduct = PRODUCTS.find((p) => p.id !== product.id)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-muted)' }}>
          <Link to="/shop" className="flex items-center gap-1 hover:text-forest transition-colors">
            <ArrowLeft size={14} /> Shop
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-dark)', fontWeight: 500 }}>{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="section-sm">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div
              style={{
                aspectRatio: '1',
                borderRadius: '1.5rem',
                background: `linear-gradient(135deg, ${product.category === 'solid' ? '#8A6246, #56834D' : '#214E34, #56834D'})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <span style={{ fontSize: '5rem', opacity: 0.25 }}>
                    {product.category === 'solid' ? '🌱' : '💧'}
                  </span>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center', padding: '0 2rem' }}>
                    [Product photography placeholder]<br />Replace with actual product images before launch
                  </p>
                </>
              )}
            </div>

            {/* Product info */}
            <div>
              <p style={{ fontFamily: 'var(--font-gujarati)', fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>
                {product.nameGujarati}
              </p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {product.shortDescription}
              </p>

              {/* Pack selector */}
              <div className="mb-5">
                <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Select Pack Size
                </label>
                <div className="pack-grid">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      className={`pack-option ${selectedVariantId === v.id ? 'selected' : ''}`}
                      onClick={() => setSelectedVariantId(v.id)}
                      aria-pressed={selectedVariantId === v.id}
                    >
                      {v.label}
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 400 }}>
                        {formatPrice(v.priceInr)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-5">
                <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Quantity
                </label>
                <div className="qty-selector">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="qty-value" aria-live="polite">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="price-display">{formatPrice(lineTotal)}</span>
                {quantity > 1 && (
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                    ({formatPrice(selectedVariant.priceInr)} × {quantity})
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                *Placeholder price — must be confirmed before launch
              </p>

              {/* Add to cart / Buy */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  className="btn btn-primary flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} />
                  {addedFeedback ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                <button className="btn btn-whatsapp flex-1" onClick={handleWhatsApp}>
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </button>
              </div>

              <Link to="/cart" className="btn btn-secondary w-full">
                View Cart & Checkout
              </Link>

              {/* Usage note */}
              {product.usageNote && (
                <div
                  className="mt-5 p-4 rounded-xl text-sm"
                  style={{ background: 'rgba(33,78,52,0.06)', border: '1px solid rgba(33,78,52,0.15)', color: 'var(--color-forest)', fontStyle: 'italic' }}
                >
                  ⚠️ {product.usageNote}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product description */}
      <div className="section-sm" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1rem' }}>
            About This Product
          </h2>
          {product.longDescription.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.75, marginBottom: '1rem', fontStyle: para.startsWith('[') ? 'italic' : 'normal' }}>
              {para}
            </p>
          ))}

          {product.storageInstructions && (
            <div className="mt-6">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                Storage Instructions
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>
                {product.storageInstructions}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FAQs */}
      {product.faqs.length > 0 && (
        <div className="section-sm">
          <div className="container max-w-2xl">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Product FAQs
            </h2>
            <div className="flex flex-col gap-3">
              {product.faqs.map(({ question, answer }, i) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.875rem',
                    background: 'white',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', paddingRight: '1rem' }}>{question}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={18} style={{ color: 'var(--color-forest)', flexShrink: 0 }} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p style={{ padding: '0 1rem 1rem', fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.7, fontStyle: answer.startsWith('[') ? 'italic' : 'normal', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related product */}
      {relatedProduct && (
        <div className="section-sm" style={{ background: 'var(--color-cream-dark)' }}>
          <div className="container max-w-2xl text-center">
            <p className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Also Available</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {relatedProduct.name}
            </h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              {relatedProduct.shortDescription}
            </p>
            <Link to={`/products/${relatedProduct.slug}`} className="btn btn-primary">
              View {relatedProduct.name}
            </Link>
          </div>
        </div>
      )}

      {/* Policy links */}
      <div className="py-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container flex flex-wrap justify-center gap-4 text-sm" style={{ color: 'var(--color-muted)' }}>
          <Link to="/policies/shipping" className="hover:text-forest transition-colors">Shipping Policy</Link>
          <span>·</span>
          <Link to="/policies/cancellation" className="hover:text-forest transition-colors">Cancellation & Refund</Link>
          <span>·</span>
          <Link to="/policies/privacy" className="hover:text-forest transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
