import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ShoppingCart, MessageCircle } from 'lucide-react'
import { PRODUCTS, formatPrice } from '@/config/products'
import { useCart } from '@/features/cart/CartContext'
import { buildWhatsAppOrderUrl, openWhatsApp } from '@/lib/whatsapp'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[0]; index: number }) {
  const { addItem } = useCart()
  const defaultVariant = product.variants[0]

  const handleAddToCart = () => {
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

  const handleWhatsApp = () => {
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
  }

  return (
    <motion.div
      variants={fadeUp}
      className="card group"
      style={{ overflow: 'visible' }}
    >
      {/* Image placeholder */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '4/3',
          background: `linear-gradient(135deg, ${
            product.category === 'solid'
              ? '#8A6246, #56834D'
              : '#214E34, #56834D'
          })`,
          borderRadius: '1.25rem 1.25rem 0 0',
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
            <span style={{ fontSize: '3rem', opacity: 0.3 }}>
              {product.category === 'solid' ? '🌱' : '💧'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
              [Product image placeholder]
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge badge-forest" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-forest)' }}>
            {product.category === 'solid' ? 'Solid Fertiliser' : 'Liquid Product'}
          </span>
        </div>
      </div>

      <div className="card-body">
        {/* Gujarati name */}
        <p
          style={{
            fontFamily: 'var(--font-gujarati)',
            fontSize: '0.875rem',
            color: 'var(--color-muted)',
            marginBottom: '0.25rem',
          }}
        >
          {product.nameGujarati}
        </p>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          {product.name}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
          {product.shortDescription}
        </p>

        {/* Pack chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.variants.map((v) => (
            <span key={v.id} className="pack-option" style={{ padding: '0.25rem 0.625rem', fontSize: '0.8rem' }}>
              {v.label} — {formatPrice(v.priceInr)}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="price-display price-display-sm">
            {formatPrice(defaultVariant.priceInr)}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            starting / {defaultVariant.label}
          </span>
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
          *Prices are placeholder — confirm before launch
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to={`/products/${product.slug}`} className="btn btn-primary flex-1">
            View Product
            <ArrowRight size={16} />
          </Link>
          <button
            className="btn btn-icon"
            style={{ border: '1.5px solid var(--color-border)', background: 'white' }}
            onClick={handleAddToCart}
            title="Add default pack to cart"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} style={{ color: 'var(--color-forest)' }} />
          </button>
          <button
            className="btn btn-icon btn-whatsapp"
            onClick={handleWhatsApp}
            title="Order on WhatsApp"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function ProductShowcase() {
  return (
    <section className="section" id="products" aria-label="Products showcase">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-tag">
            <span style={{ display: 'inline-block', width: '1.5rem', height: '2px', background: 'var(--color-leaf)', borderRadius: '2px' }} />
            Our Products
          </p>
          <h2 className="section-title">Natural Products for Sustainable Farming</h2>
          <p className="section-subtitle mx-auto">
            Carefully made with traditional inputs to support healthier soil and stronger crops.
          </p>
        </div>

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/shop" className="btn btn-secondary">
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
