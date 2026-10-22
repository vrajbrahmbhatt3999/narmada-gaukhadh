import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Leaf, Sprout, Calculator, Star, ShieldCheck, Sparkles } from 'lucide-react'
import { useLanguage } from '@/features/i18n/LanguageContext'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export function HeroSection() {
  const { t, isGujarati } = useLanguage()

  const scrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('calculator')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero relative overflow-hidden" aria-label="Hero section">
      {/* Pattern overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Decorative ambient glowing auras */}
      <div
        aria-hidden="true"
        className="hidden sm:block pointer-events-none absolute -top-24 -right-24 w-[550px] h-[550px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(110, 171, 100, 0.28) 0%, rgba(33, 78, 52, 0) 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        aria-hidden="true"
        className="hidden sm:block pointer-events-none absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(230, 167, 60, 0.18) 0%, rgba(138, 98, 70, 0) 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="container relative z-10 py-12 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Tag / Eyebrow */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <Sparkles size={14} className="text-emerald-300 animate-pulse" />
                <span className="text-emerald-300 font-bold">
                  {isGujarati ? '✦ પ્રાકૃતિક ગૌ-કૃષિ' : '✦ 100% Cow-Based'}
                </span>
                <span className="text-white/80">• {t.heroBadge}</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="mb-5 sm:mb-6 leading-[1.12]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              {t.heroTitle1}
              <br />
              <span
                className="bg-gradient-to-r from-emerald-300 via-green-200 to-amber-200 bg-clip-text text-transparent inline-block"
                style={{
                  fontFamily: isGujarati ? 'var(--font-gujarati)' : 'var(--font-display)',
                }}
              >
                {t.heroTitle2}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-white/90 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-normal"
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                textShadow: '0 1px 8px rgba(0,0,0,0.25)',
              }}
            >
              {t.heroTagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Link
                to="/shop"
                className="btn btn-cream btn-lg shadow-xl hover:scale-105 active:scale-95 transition-all text-center justify-center font-bold"
                style={{
                  background: '#FFFFFF',
                  color: 'var(--color-forest)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                }}
              >
                <span>{t.heroCtaShop}</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#calculator"
                onClick={scrollToCalculator}
                className="btn btn-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }}
              >
                <Calculator size={18} className="text-emerald-300" />
                <span>{t.heroCtaCalc}</span>
              </a>
            </motion.div>

            {/* Trust Signal Pills */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15 max-w-lg mx-auto lg:mx-0 text-white"
            >
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-amber-300 mb-0.5">
                  <Star size={14} className="fill-amber-300" />
                  <span className="font-bold text-sm text-white">4.9 / 5</span>
                </div>
                <span className="text-[11px] sm:text-xs text-white/75 font-medium leading-tight">
                  {isGujarati ? 'ખેડૂત સંતોષ' : 'Farmer Rating'}
                </span>
              </div>

              <div className="flex flex-col items-center lg:items-start border-x border-white/15 px-3">
                <div className="flex items-center gap-1 text-emerald-300 mb-0.5">
                  <ShieldCheck size={14} />
                  <span className="font-bold text-sm text-white">100%</span>
                </div>
                <span className="text-[11px] sm:text-xs text-white/75 font-medium leading-tight">
                  {isGujarati ? 'શુદ્ધ ગૌ-આધારિત' : 'Panchagavya'}
                </span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-emerald-300 mb-0.5">
                  <Sprout size={14} />
                  <span className="font-bold text-sm text-white">10K+</span>
                </div>
                <span className="text-[11px] sm:text-xs text-white/75 font-medium leading-tight">
                  {isGujarati ? 'એકર સુધારેલ' : 'Acres Enriched'}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex flex-col items-center"
          >
            {/* Main Featured Photo Card */}
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl group"
              style={{
                border: '2px solid rgba(255,255,255,0.22)',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.3) 100%)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px rgba(86, 131, 77, 0.25)',
              }}
            >
              {/* Product Photography Showcase */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/assets/images/hero_farm.jpg"
                  alt="Narmada Gaukhadh Organic Vermicompost and Bio-Fertilizer on Lush Green Farmland"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Live Floating Chip 1 (Top Left) */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg"
                  style={{
                    background: 'rgba(15, 56, 34, 0.85)',
                    border: '1px solid rgba(168, 213, 162, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    {isGujarati ? 'સજીવ પ્રાકૃતિક ખાતર' : '100% Certified Organic'}
                  </span>
                </motion.div>

                {/* Photo Caption Overlay at Bottom */}
                <div className="absolute bottom-3 inset-x-3.5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    {isGujarati ? 'નર્મદા ગૌખાધ પરિવાર' : 'Direct From Gujarat Farmland'}
                  </span>
                  <p className="font-serif text-sm font-semibold text-white/95 leading-snug">
                    {isGujarati
                      ? 'અળસિયું ખાતર અને વિધ્યાંચળ પ્રાકૃતિક ટોનિક'
                      : 'Vermicompost & Vidhyanchal Liquid Bio-Fertilizer'}
                  </p>
                </div>
              </div>

              {/* Quick Product Switcher Strip */}
              <div className="p-3.5 grid grid-cols-2 gap-2.5 bg-black/40 backdrop-blur-md border-t border-white/10">
                <Link
                  to="/products/vermicompost"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group/btn"
                >
                  <img
                    src="/assets/images/vermicompost.jpg"
                    alt="Vermicompost"
                    className="w-10 h-10 rounded-lg object-cover border border-white/20 shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate group-hover/btn:text-emerald-300 transition-colors">
                      {isGujarati ? 'અળસિયું ખાતર' : 'Vermicompost'}
                    </span>
                    <span className="text-[10px] text-white/70">
                      ₹99 {isGujarati ? 'થી શરૂ' : 'onwards'}
                    </span>
                  </div>
                </Link>

                <Link
                  to="/products/vidhyanchal"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group/btn"
                >
                  <img
                    src="/assets/images/vidhyanchal.jpg"
                    alt="Vidhyanchal"
                    className="w-10 h-10 rounded-lg object-cover border border-white/20 shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate group-hover/btn:text-emerald-300 transition-colors">
                      {isGujarati ? 'વિધ્યાંચળ લિક્વિડ' : 'Vidhyanchal'}
                    </span>
                    <span className="text-[10px] text-white/70">
                      ₹149 {isGujarati ? 'થી શરૂ' : 'onwards'}
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Bottom Floating Trust Pill */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-full shadow-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(12px)',
                color: 'white',
              }}
            >
              <Leaf size={14} className="text-emerald-300 shrink-0" />
              <span className="text-xs font-medium text-white/95">
                {isGujarati
                  ? 'ગાયના ગોબરમાંથી બનેલ ૧૦૦% ઝેરી તત્વો મુક્ત'
                  : 'Made From Pure Gir Cow Inputs • Zero Chemical Toxins'}
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Wave bottom transition */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45px',
          background: 'var(--color-cream)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }}
      />
    </section>
  )
}
