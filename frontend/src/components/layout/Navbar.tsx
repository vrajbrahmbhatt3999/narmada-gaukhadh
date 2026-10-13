import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react'
import { useCart } from '@/features/cart/CartContext'
import { SITE_CONFIG } from '@/config/products'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { itemCount } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
              className="flex items-center gap-2 font-bold"
              aria-label="Narmada Gaukhadh — Home"
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: 'var(--color-forest)' }}
              >
                <Leaf size={18} color="white" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--color-forest)' }}>
                Narmada Gaukhadh
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-forest/10 text-forest font-semibold'
                        : 'text-dark/70 hover:text-forest hover:bg-forest/5'
                    }`
                  }
                  style={{ color: 'inherit' }}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/shop"
                className="btn btn-primary btn-sm hidden md:inline-flex"
                aria-label="Order Now"
              >
                Order Now
              </Link>

              <Link
                to="/cart"
                className="btn btn-icon relative"
                style={{ border: '1.5px solid var(--color-border)', background: 'white' }}
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingCart size={20} style={{ color: 'var(--color-forest)' }} />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white"
                    style={{ background: 'var(--color-forest)' }}
                    aria-hidden="true"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                className="btn btn-icon md:hidden"
                style={{ border: '1.5px solid var(--color-border)', background: 'white' }}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <X size={20} style={{ color: 'var(--color-forest)' }} />
                ) : (
                  <Menu size={20} style={{ color: 'var(--color-forest)' }} />
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
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-forest)' }}>
            Menu
          </span>
          <button
            className="btn btn-icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            style={{ border: '1.5px solid var(--color-border)' }}
          >
            <X size={18} style={{ color: 'var(--color-forest)' }} />
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
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
          ))}
        </nav>

        <div className="p-4 border-t flex flex-col gap-2" style={{ borderColor: 'var(--color-border)' }}>
          {SITE_CONFIG.whatsappNumber && (
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full"
            >
              Order on WhatsApp
            </a>
          )}
          <Link
            to="/shop"
            className="btn btn-primary w-full"
            onClick={() => setIsOpen(false)}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  )
}
