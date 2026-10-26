import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ShoppingCart, MessageCircle, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS, getProductBySlug, formatPrice, SITE_CONFIG } from '@/config/products'
import { useCart } from '@/features/cart/CartContext'
import { buildWhatsAppOrderUrl, openWhatsApp } from '@/lib/whatsapp'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  const { addItem } = useCart()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id ?? ''
  )
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    setActiveImageIndex(0)
    if (product) {
      setSelectedVariantId(product.variants[0]?.id ?? '')
    }
  }, [slug])

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
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
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
                className="shadow-xl border border-stone-200/50 group"
              >
                {product.images && product.images.length > 0 ? (
                  <motion.img
                    key={product.images[activeImageIndex] || product.images[0]}
                    initial={{ opacity: 0.7, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={`${product.name} - View ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span style={{ fontSize: '5rem', opacity: 0.25 }}>
                      {product.category === 'solid' ? '🌱' : '💧'}
                    </span>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center', padding: '0 2rem' }}>
                      [Product photography placeholder]
                    </p>
                  </>
                )}

                {/* Left/Right Prev/Next Buttons */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev > 0 ? prev - 1 : product.images.length - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg opacity-85 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev < product.images.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg opacity-85 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
                    </button>

                    {/* Image Counter Pill */}
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md shadow-md">
                      {activeImageIndex + 1} / {product.images.length}
                    </span>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-105'
                          : 'border-stone-200 opacity-60 hover:opacity-100 hover:border-emerald-300'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
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

              {/* Official Brochure Download Banner */}
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <FileText size={17} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-amber-950 truncate">
                      સત્તાવાર ગુજરાતી બ્રોશર & AAU લેબ રિપોર્ટ
                    </p>
                    <p className="text-[11px] text-amber-800/80 truncate">
                      Official 4-Page Farm Manual (19 MB PDF)
                    </p>
                  </div>
                </div>
                <a
                  href={SITE_CONFIG.brochurePdf}
                  download={SITE_CONFIG.brochureDirectName}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 flex-shrink-0 shadow-xs transition-colors"
                  title="Download Gujarati Brochure PDF"
                >
                  <Download size={13} />
                  <span>PDF</span>
                </a>
              </div>

              {/* Usage note */}
              {product.usageNote && (
                <div
                  className="mt-6 p-4 rounded-2xl text-sm"
                  style={{
                    background: 'rgba(33,78,52,0.05)',
                    border: '1px solid rgba(33,78,52,0.15)',
                    color: 'var(--color-forest)',
                  }}
                >
                  <strong className="block font-semibold mb-2 text-emerald-950 flex items-center gap-1.5">
                    <span>🌱</span> Application & Usage Instructions:
                  </strong>
                  <div className="whitespace-pre-line text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {product.usageNote}
                  </div>
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

          {product.ingredients && (
            <div className="mt-6 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', marginBottom: '0.4rem', color: '#163424' }}>
                Pure Ingredients & Formula
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                {product.ingredients}
              </p>
            </div>
          )}

          {product.storageInstructions && (
            <div className="mt-5">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', marginBottom: '0.4rem', color: '#163424' }}>
                Storage Instructions
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
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
