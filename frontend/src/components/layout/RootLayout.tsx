import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { AnnouncementBar } from './AnnouncementBar'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { SITE_CONFIG } from '@/config/products'

export function RootLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      {SITE_CONFIG.announcement && (
        <AnnouncementBar message={SITE_CONFIG.announcement} />
      )}
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
