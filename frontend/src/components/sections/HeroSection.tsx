import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, MessageCircle, Leaf, Sprout, Droplets } from 'lucide-react'
import { SITE_CONFIG } from '@/config/products'
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

export function HeroSection() {
  const whatsappUrl = buildWhatsAppOrderUrl([
    {
      productName: 'Product Enquiry',
      variantLabel: '',
      quantity: 1,
      pricePerUnit: 0,
      totalPrice: 0,
    },
  ])

  return (
    <section className="hero" aria-label="Hero section">
      {/* Pattern overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(86,131,77,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138,98,70,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative" style={{ zIndex: 2, padding: '4rem 1.5rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            {/* Tag */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <span
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Leaf size={14} />
                Natural Farming · Traditional Wisdom
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.15,
              }}
            >
              Nurture Your Soil.
              <br />
              <span style={{ color: '#A8D5A2' }}>Grow Naturally.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.175rem)',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: '2.5rem',
                maxWidth: '520px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
              }}
              className="lg:mx-0"
            >
              {SITE_CONFIG.description} Premium vermicompost and natural liquid products for healthier crops and sustainable farms.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Link to="/shop" className="btn btn-cream btn-lg w-full sm:w-auto">
                Explore Products
                <ArrowRight size={18} />
              </Link>

              {SITE_CONFIG.whatsappNumber ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg w-full sm:w-auto"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="btn btn-lg w-full sm:w-auto"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                  }}
                >
                  Contact Us
                </Link>
              )}
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10"
            >
              {[
                { icon: Leaf, label: 'Natural Inputs' },
                { icon: Sprout, label: 'Organic Process' },
                { icon: Droplets, label: 'Panchagavya Based' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <Icon size={16} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero image / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div
              style={{
                width: 'min(420px, 100%)',
                aspectRatio: '4/5',
                borderRadius: '2rem',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '2rem',
              }}
            >
              {/* Placeholder for product hero image */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(168,213,162,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <Leaf size={36} style={{ color: '#A8D5A2' }} />
              </div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
              >
                [Product hero image placeholder]
                <br />
                <span style={{ fontSize: '0.75rem' }}>Replace with actual product photography</span>
              </p>

              {/* Product teasers */}
              <div className="w-full flex flex-col gap-3 mt-4">
                {['Vermicompost', 'Vidhyanchal'].map((name) => (
                  <Link
                    key={name}
                    to={`/products/${name.toLowerCase()}`}
                    className="flex items-center justify-between p-3 rounded-xl transition-all hover:bg-white/10"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{name}</span>
                    <ArrowRight size={14} style={{ color: '#A8D5A2' }} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'var(--color-cream)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }}
      />
    </section>
  )
}
