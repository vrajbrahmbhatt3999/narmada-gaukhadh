import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, MessageCircle } from 'lucide-react'
import { PRODUCTS, formatPrice } from '@/config/products'

export function PackSelectorSection() {
  return (
    <section className="section" style={{ background: 'var(--color-cream-dark)' }} aria-label="Choose your pack">
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', width: '1.5rem', height: '2px', background: 'var(--color-leaf)', borderRadius: '2px' }} />
            Pack Sizes
          </p>
          <h2 className="section-title">Choose the Right Pack</h2>
          <p className="section-subtitle mx-auto">
            We offer multiple pack sizes to suit individual farmers and bulk buyers. For the right quantity for your farm, please refer to the usage instructions provided with your order.
          </p>
          <div
            className="inline-block mt-4 px-4 py-2 rounded-lg text-sm"
            style={{ background: 'rgba(33,78,52,0.07)', color: 'var(--color-forest)', fontStyle: 'italic', border: '1px solid rgba(33,78,52,0.12)' }}
          >
            ⚠️ Prices shown are temporary placeholders. Confirm actual prices with the business before launch.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: 'rgba(33,78,52,0.08)', color: 'var(--color-forest)' }}
                  >
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem' }}>{product.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontFamily: 'var(--font-gujarati)' }}>
                      {product.nameGujarati}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-5">
                  {product.variants.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
                    >
                      <div>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{v.label}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginLeft: '0.5rem' }}>
                          SKU: {v.sku}
                        </span>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--color-forest)', fontSize: '1.0625rem' }}>
                        {formatPrice(v.priceInr)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link to={`/products/${product.slug}`} className="btn btn-primary flex-1 btn-sm">
                    Order Now
                  </Link>
                  <Link to="/contact#bulk" className="btn btn-secondary btn-sm flex-1">
                    <MessageCircle size={15} />
                    Bulk Enquiry
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
