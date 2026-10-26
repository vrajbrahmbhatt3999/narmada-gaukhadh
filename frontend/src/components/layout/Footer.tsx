import { Link } from 'react-router-dom'
import { Leaf, Phone, Mail, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/config/products'

const footerLinks = {
  shop: [
    { to: '/products/vermicompost', label: 'Vermicompost' },
    { to: '/products/vidhyanchal', label: 'Vidhyanchal' },
    { to: '/shop', label: 'All Products' },
  ],
  company: [
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/contact#bulk', label: 'Bulk Enquiry' },
    { to: '/NG-Brochure-Gujarati.pdf', label: '📄 Official Brochure (PDF)', isDownload: true },
  ],
  policies: [
    { to: '/policies/privacy', label: 'Privacy Policy' },
    { to: '/policies/terms', label: 'Terms & Conditions' },
    { to: '/policies/shipping', label: 'Shipping Policy' },
    { to: '/policies/cancellation', label: 'Cancellation & Refund' },
  ],
}

export function Footer() {
  return (
    <footer style={{ background: 'var(--color-dark)', color: 'rgba(255,255,255,0.85)' }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4 group" aria-label="Narmada Gaukhadh Home">
              <img
                src={SITE_CONFIG.logoUrl}
                alt="Narmada Gaukhadh Vermicompost"
                className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-md transition-transform group-hover:scale-102"
                height={56}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '300px' }}>
              Natural agricultural products rooted in traditional Panchagavya farming practices. Supporting sustainable organic agriculture across Gujarat & India.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              {SITE_CONFIG.phone && (
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <Phone size={14} />
                  <span>{SITE_CONFIG.phone}</span>
                  {SITE_CONFIG.secondaryPhone && (
                    <span className="text-white/40">| {SITE_CONFIG.secondaryPhone}</span>
                  )}
                </a>
              )}
              {SITE_CONFIG.email && (
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Mail size={14} />
                  {SITE_CONFIG.email}
                </a>
              )}
              {SITE_CONFIG.whatsappNumber && (
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              )}
            </div>

            {/* Social */}
            {(SITE_CONFIG.social.instagram || SITE_CONFIG.social.facebook || SITE_CONFIG.social.youtube) && (
              <div className="flex items-center gap-3 mt-5">
                {SITE_CONFIG.social.instagram && (
                  <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="p-2 rounded-full transition-colors hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                )}
                {SITE_CONFIG.social.facebook && (
                  <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="p-2 rounded-full transition-colors hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                )}
                {SITE_CONFIG.social.youtube && (
                  <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                    className="p-2 rounded-full transition-colors hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Shop</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.shop.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Company</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((l) => (
                <li key={l.to}>
                  {'isDownload' in l && l.isDownload ? (
                    <a
                      href={l.to}
                      download="Narmada-Gaukhadh-Gujarati-Brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-white flex items-center gap-1.5"
                      style={{ color: 'rgba(255,255,255,0.75)' }}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.to}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Policies</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.policies.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
        >
          <p>© {new Date().getFullYear()} Narmada Gaukhadh. All rights reserved.</p>
          <p>Made with 🌿 in India | Prices are subject to change</p>
        </div>
      </div>
    </footer>
  )
}
