import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ShoppingCart, MessageCircle, Check, Star, Sparkles } from 'lucide-react'
import { PRODUCTS, formatPrice } from '@/config/products'
import { useCart } from '@/features/cart/CartContext'
import { useLanguage } from '@/features/i18n/LanguageContext'
import { buildWhatsAppOrderUrl, openWhatsApp } from '@/lib/whatsapp'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[0]; index: number }) {
  const { addItem } = useCart()
  const { t, isGujarati } = useLanguage()
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id)
  const [justAdded, setJustAdded] = useState(false)

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      variantId: activeVariant.id,
      variantLabel: activeVariant.label,
      sku: activeVariant.sku,
      quantity: 1,
      pricePerUnit: activeVariant.priceInr,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  const handleWhatsApp = () => {
    const url = buildWhatsAppOrderUrl([
      {
        productName: isGujarati ? product.nameGujarati : product.name,
        variantLabel: activeVariant.label,
        quantity: 1,
        pricePerUnit: activeVariant.priceInr,
        totalPrice: activeVariant.priceInr,
      },
    ])
    openWhatsApp(url)
  }

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-[#214E34]/15 shadow-xl hover:shadow-2xl transition-all"
    >
      <div>
        {/* Image Stage with Photo */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Top Category Badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md"
              style={{
                background:
                  product.category === 'solid'
                    ? 'rgba(33, 78, 52, 0.88)'
                    : 'rgba(22, 52, 36, 0.88)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <Sparkles size={12} className="text-emerald-300" />
              {product.category === 'solid'
                ? isGujarati
                  ? 'અળસિયું ખાતર (Solid)'
                  : 'Solid Compost'
                : isGujarati
                ? 'બાયો-ટોનિક (Liquid)'
                : 'Liquid Bio-Fertilizer'}
            </span>
          </div>

          {/* Star Rating Badge (Top Right) */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
            <Star size={12} className="fill-amber-300" />
            <span className="text-white text-[11px]">4.9</span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-widest block mb-0.5">
              {isGujarati ? product.name : product.nameGujarati}
            </span>
            <h3
              className="text-lg sm:text-xl font-bold font-serif text-white leading-snug drop-shadow"
              style={{ fontFamily: isGujarati ? 'var(--font-gujarati)' : 'var(--font-display)' }}
            >
              {isGujarati ? product.nameGujarati : product.name}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex flex-col">
          <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          {/* Interactive Pack Selector Pills */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2">
              {isGujarati ? 'પેકિંગ પસંદ કરો (Select Pack Size):' : 'Choose Pack Size:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const isSelected = v.id === activeVariant.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-[#214E34] text-white border-[#214E34] shadow-md scale-105'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#214E34]/40 hover:bg-stone-100'
                    }`}
                  >
                    {v.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Live Price Display */}
          <div className="flex items-baseline gap-2.5 py-2 border-t border-stone-100 mb-4">
            <span className="text-2xl font-extrabold text-[#214E34]">
              {formatPrice(activeVariant.priceInr)}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              / {activeVariant.label} {isGujarati ? 'પેક' : 'pack'}
            </span>
            <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {isGujarati ? 'સ્ટોક ઉપલબ્ધ' : 'In Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          className={`btn flex-1 py-3 text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#214E34] text-white hover:bg-[#163424]'
          }`}
        >
          {justAdded ? (
            <>
              <Check size={16} />
              <span>{isGujarati ? 'કાર્ટમાં ઉમેરાયું!' : 'Added to Cart!'}</span>
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              <span>{isGujarati ? 'કાર્ટમાં ઉમેરો' : 'Add To Cart'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleWhatsApp}
          className="btn btn-whatsapp p-3 shadow-md hover:scale-105 transition-all text-white bg-[#25D366] hover:bg-[#20ba59]"
          title="Direct WhatsApp Order"
          aria-label={`Order ${product.name} on WhatsApp`}
        >
          <MessageCircle size={18} />
        </button>

        <Link
          to={`/products/${product.slug}`}
          className="p-3 rounded-full border border-stone-300 text-stone-600 hover:border-[#214E34] hover:text-[#214E34] transition-colors"
          title="Full details"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  )
}

export function ProductShowcase() {
  const { t, isGujarati } = useLanguage()

  return (
    <section className="section py-20 bg-stone-50/60" id="products" aria-label="Products showcase">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>✦</span>
            <span>{t.productShowcaseTag}</span>
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            {t.productShowcaseTitle}
          </h2>
          <p className="section-subtitle mx-auto text-stone-600 leading-relaxed text-sm sm:text-base">
            {t.productShowcaseSubtitle}
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

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="btn btn-secondary inline-flex items-center gap-2 font-bold px-7 py-3 text-xs uppercase tracking-wider"
          >
            <span>{isGujarati ? 'બધી પ્રોડક્ટ્સ જુઓ' : 'Explore Complete Catalog'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
