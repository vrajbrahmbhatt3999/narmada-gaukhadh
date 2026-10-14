import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Leaf, Calculator, Globe } from 'lucide-react'
import { useCart } from '@/features/cart/CartContext'
import { useLanguage } from '@/features/i18n/LanguageContext'
import { SITE_CONFIG } from '@/config/products'

export function Navbar() {
  const { itemCount } = useCart()
  const { language, setLanguage, t, isGujarati } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLinks = [
    { to: '/', label: t.navHome },
    { to: '/shop', label: t.navShop },
    { to: '/#calculator', label: t.navCalculator, isAnchor: true },
    { to: '/about', label: t.navAbout },
    { to: '/contact', label: t.navContact },
  ]

  const handleAnchorClick = (e: React.MouseEvent, to: string) => {
    if (to.includes('#calculator')) {
      e.preventDefault()
      if (location.pathname !== '/') {
        window.location.href = '/#calculator'
      } else {
        const el = document.getElementById('calculator')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      setIsOpen(false)
    }
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(248,245,234,0.97)' : 'var(--color-cream)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(33,78,52,0.1)' : 'none',
          borderBottom: scrolled ? 'none' : '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 font-bold min-w-0 flex-shrink"
              aria-label="Narmada Gaukhadh — Home"
            >
              <div
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-forest)' }}
              >
                <Leaf size={16} color="white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-base font-bold truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)', lineHeight: 1.1 }}>
                  {isGujarati ? SITE_CONFIG.brandNameGujarati : SITE_CONFIG.brandName}
                </span>
                <span className="text-[9px] sm:text-[10px] text-stone-500 tracking-wider truncate">
                  {isGujarati ? 'પ્રાકૃતિક કૃષિ ઉત્પાદનો' : 'Pure Soil · Pure Crops'}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                link.isAnchor ? (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={(e) => handleAnchorClick(e, link.to)}
                    className="px-3.5 py-2 rounded-full text-sm font-medium transition-all text-dark/75 hover:text-forest hover:bg-forest/5 flex items-center gap-1.5"
                  >
                    <Calculator size={14} className="text-emerald-700" />
                    <span>{link.label}</span>
                  </a>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-forest/10 text-forest font-semibold'
                          : 'text-dark/75 hover:text-forest hover:bg-forest/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              {/* Language Switcher Pill */}
              <div
                className="flex items-center p-0.5 rounded-full border"
                style={{
                  background: 'rgba(33,78,52,0.06)',
                  borderColor: 'rgba(33,78,52,0.15)',
                }}
                title="Change Language"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                    language === 'en'
                      ? 'bg-forest text-white shadow-xs'
                      : 'text-stone-600 hover:text-forest'
                  }`}
                  style={{
                    backgroundColor: language === 'en' ? 'var(--color-forest)' : 'transparent',
                    color: language === 'en' ? 'white' : 'inherit',
                  }}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('gu')}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                    language === 'gu'
                      ? 'bg-forest text-white shadow-xs'
                      : 'text-stone-600 hover:text-forest'
                  }`}
                  style={{
                    backgroundColor: language === 'gu' ? 'var(--color-forest)' : 'transparent',
                    color: language === 'gu' ? 'white' : 'inherit',
                  }}
                  aria-label="Switch to Gujarati"
                >
                  ગુજરાતી
                </button>
              </div>

              <Link
                to="/shop"
                className="btn btn-primary btn-sm hidden lg:inline-flex"
                aria-label="Order Now"
              >
                {t.navShop}
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="btn btn-icon relative w-9 h-9 sm:w-10 sm:h-10"
                style={{ border: '1.5px solid var(--color-border)', background: 'white' }}
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingCart size={18} style={{ color: 'var(--color-forest)' }} />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] sm:text-xs font-bold text-white"
                    style={{ background: 'var(--color-forest)' }}
                    aria-hidden="true"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                className="btn btn-icon md:hidden w-9 h-9 sm:w-10 sm:h-10"
                style={{ border: '1.5px solid var(--color-border)', background: 'white' }}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <X size={18} style={{ color: 'var(--color-forest)' }} />
                ) : (
                  <Menu size={18} style={{ color: 'var(--color-forest)' }} />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(32,40,32,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className="fixed top-0 right-0 h-full w-72 z-40 md:hidden flex flex-col"
        style={{
          background: 'var(--color-cream)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '-8px 0 40px rgba(33,78,52,0.15)',
        }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-forest" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-forest)' }}>
              {isGujarati ? 'મેનુ' : 'Menu'}
            </span>
          </div>
          <button
            className="btn btn-icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            style={{ border: '1.5px solid var(--color-border)' }}
          >
            <X size={18} style={{ color: 'var(--color-forest)' }} />
          </button>
        </div>

        {/* Mobile Language Switcher */}
        <div className="p-4 border-b border-stone-200">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
            {isGujarati ? 'ભાષા પસંદ કરો / Language' : 'Select Language'}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                language === 'en'
                  ? 'bg-forest text-white border-forest'
                  : 'bg-white text-stone-700 border-stone-200'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('gu')}
              className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                language === 'gu'
                  ? 'bg-forest text-white border-forest'
                  : 'bg-white text-stone-700 border-stone-200'
              }`}
            >
              ગુજરાતી
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleAnchorClick(e, link.to)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-dark/75 hover:bg-forest/5"
              >
                <Calculator size={18} className="text-emerald-700" />
                <span>{link.label}</span>
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'font-semibold'
                      : 'text-dark/70'
                  }`
                }
                style={({ isActive }) => ({
                  background: isActive ? 'rgba(33,78,52,0.08)' : 'transparent',
                  color: isActive ? 'var(--color-forest)' : undefined,
                })}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            )
          ))}
        </nav>

        <div className="p-4 border-t flex flex-col gap-2" style={{ borderColor: 'var(--color-border)' }}>
          <Link
            to="/shop"
            className="btn btn-primary w-full"
            onClick={() => setIsOpen(false)}
          >
            {t.navShop}
          </Link>
        </div>
      </div>
    </>
  )
}
