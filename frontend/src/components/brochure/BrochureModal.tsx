import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2, ChevronLeft, ChevronRight, FileText, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/features/i18n/LanguageContext'
import { SITE_CONFIG } from '@/config/products'

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
  initialPage?: number
}

const brochurePages = [
  {
    page: 1,
    titleGu: 'પૃષ્ઠ ૧: સત્તાવાર કવર — શિવાય ડેરી ફાર્મ & નર્મદા ગૌખાધ',
    titleEn: 'Page 1: Official Brand Cover — Shivay Dairy Farm & Narmada Gaukhadh',
    descGu: 'શુદ્ધ દેશી ગીર ગાય આધારિત વર્મીકમ્પોસ્ટ',
    descEn: 'Pure Desi Gir Cow Based Vermicompost',
    image: '/assets/images/brochure/page-1.webp',
    thumb: '/assets/images/brochure/page-1-thumb.webp',
  },
  {
    page: 2,
    titleGu: 'પૃષ્ઠ ૨: અળસિયા ખાતર પેકિંગ (૧kg, ૫kg, ૨૫kg), ફાયદા અને ૬ સ્ટેપ માર્ગદર્શિકા',
    titleEn: 'Page 2: Vermicompost Packs (1kg, 5kg, 25kg), Benefits & 6-Step Guide',
    descGu: '૩-૪ જાતના ઉત્તમ અળસિયા, પંચગવ્ય નિર્માણ રીત અને ઉપયોગના સરળ પગલાં',
    descEn: '3-4 earthworm species, 45-day cycle, Panchagavya & 6 application steps',
    image: '/assets/images/brochure/page-2.webp',
    thumb: '/assets/images/brochure/page-2-thumb.webp',
  },
  {
    page: 3,
    titleGu: 'પૃષ્ઠ ૩: વિંધ્યાચલ Vermiwash (૫૦૦ml, ૧Ltr) & માટી બચાવો અભિયાન',
    titleEn: 'Page 3: Vidhyanchal Vermiwash (500ml, 1Ltr) & Save Soil Campaign',
    descGu: 'પંચગવ્ય યુક્ત પ્રવાહી ખાતર, ઉપયોગ પ્રમાણ અને વૈશ્વિક માટી જાગૃતિ તથ્યો',
    descEn: 'Panchagavya liquid bio-tonic, dosage guide, and global soil crisis facts',
    image: '/assets/images/brochure/page-3.webp',
    thumb: '/assets/images/brochure/page-3-thumb.webp',
  },
  {
    page: 4,
    titleGu: 'પૃષ્ઠ ૪: આણંદ કૃષિ યુનિવર્સિટી (AAU) લેબ ટેસ્ટ પ્રમાણપત્ર & સંપર્ક વિગત',
    titleEn: 'Page 4: Anand Agricultural University (AAU) Lab Certificate & Contacts',
    descGu: 'સેન્દ્રિય કાર્બન ૩૧.૭૧%, NPK ચકાસણી રિપોર્ટ અને QR કોડ્સ + હેલ્પલાઇન નંબરો',
    descEn: 'Organic Carbon 31.71%, NPK analysis certificate & direct contact helpline',
    image: '/assets/images/brochure/page-4.webp',
    thumb: '/assets/images/brochure/page-4-thumb.webp',
  },
]

export function BrochureModal({ isOpen, onClose, initialPage = 1 }: BrochureModalProps) {
  const { isGujarati } = useLanguage()
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(initialPage)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentPage((prev) => Math.min(prev + 1, brochurePages.length))
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const activePageData = brochurePages[currentPage - 1]

  const handleShare = () => {
    const shareUrl = window.location.origin + SITE_CONFIG.brochurePdf
    const shareText = isGujarati
      ? `🌱 નર્મદા ગૌખાધ - સત્તાવાર પ્રાકૃતિક કૃષિ બ્રોશર (PDF)\nઆણંદ કૃષિ યુનિવર્સિટી લેબ પ્રમાણપત્ર અને સંપૂર્ણ માહિતી:\n${shareUrl}`
      : `🌱 Narmada Gaukhadh - Official Gujarati Farm Brochure & AAU Lab Report:\n${shareUrl}`

    if (navigator.share) {
      navigator.share({
        title: 'Narmada Gaukhadh Brochure',
        text: shareText,
        url: shareUrl,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${shareText}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
        style={{ background: 'rgba(10, 24, 16, 0.88)', backdropFilter: 'blur(8px)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Brochure viewer modal"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-stone-900 rounded-2xl shadow-2xl border border-emerald-900/40 flex flex-col max-h-[95vh] overflow-hidden text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-800 bg-stone-950/80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <FileText size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold truncate text-stone-100">
                  {isGujarati ? activePageData.titleGu : activePageData.titleEn}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-400 truncate">
                  {isGujarati ? activePageData.descGu : activePageData.descEn}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              {/* Download PDF button */}
              <a
                href={SITE_CONFIG.brochurePdf}
                download={SITE_CONFIG.brochureDirectName}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
                title="Download complete PDF (19 MB)"
              >
                <Download size={14} />
                <span>{isGujarati ? 'PDF ડાઉનલોડ કરો (૧૯ MB)' : 'Download PDF (19 MB)'}</span>
              </a>

              {/* Share button */}
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors flex items-center gap-1"
                title="Share Brochure"
              >
                {copied ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Share2 size={15} />}
                <span className="hidden sm:inline">{copied ? (isGujarati ? 'લિંક કોપી થઈ!' : 'Copied!') : (isGujarati ? 'શેર કરો' : 'Share')}</span>
              </button>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main preview stage */}
          <div className="relative flex-1 bg-stone-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none min-h-[350px] sm:min-h-[500px]">
            {/* Prev button */}
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="absolute left-2 sm:left-4 z-10 w-10 h-10 rounded-full bg-stone-900/80 hover:bg-emerald-700 disabled:opacity-25 disabled:pointer-events-none text-white flex items-center justify-center transition-all shadow-lg border border-stone-700"
              aria-label="Previous page"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Page Image */}
            <motion.div
              key={currentPage}
              initial={{ opacity: 0.4, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="max-h-[60vh] sm:max-h-[70vh] flex items-center justify-center"
            >
              <img
                src={activePageData.image}
                alt={`Brochure Page ${currentPage}`}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full rounded-lg shadow-2xl object-contain border border-stone-800"
              />
            </motion.div>

            {/* Next button */}
            <button
              type="button"
              disabled={currentPage >= brochurePages.length}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, brochurePages.length))}
              className="absolute right-2 sm:right-4 z-10 w-10 h-10 rounded-full bg-stone-900/80 hover:bg-emerald-700 disabled:opacity-25 disabled:pointer-events-none text-white flex items-center justify-center transition-all shadow-lg border border-stone-700"
              aria-label="Next page"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Bottom Bar: Thumbnails & Controls */}
          <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Thumbnails strip */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {brochurePages.map((p) => (
                <button
                  key={p.page}
                  type="button"
                  onClick={() => setCurrentPage(p.page)}
                  className={`relative flex-shrink-0 w-14 sm:w-16 rounded-md overflow-hidden border-2 transition-all ${
                    currentPage === p.page
                      ? 'border-emerald-400 scale-105 shadow-md shadow-emerald-900/50'
                      : 'border-stone-800 opacity-60 hover:opacity-100 hover:border-stone-600'
                  }`}
                >
                  <img src={p.thumb} alt={`Page ${p.page}`} className="w-full h-16 sm:h-20 object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[10px] text-center font-bold text-stone-200 py-0.5">
                    {p.page}/4
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile PDF download & phone contact */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <a
                href={SITE_CONFIG.brochurePdf}
                download={SITE_CONFIG.brochureDirectName}
                className="sm:hidden flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-sm"
              >
                <Download size={14} />
                <span>{isGujarati ? 'PDF ડાઉનલોડ (૧૯ MB)' : 'Download PDF'}</span>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  isGujarati
                    ? 'નમસ્તે! મેં નર્મદા ગૌખાધનું બ્રોશર જોયું. મને વધુ વિગત અને ઓર્ડર વિશે જાણવું છે.'
                    : 'Hello! I checked the Narmada Gaukhadh brochure and would like to inquire about ordering.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-800/60 hover:bg-emerald-700/80 text-emerald-200 border border-emerald-600/30 transition-colors flex items-center gap-1.5"
              >
                <span>{isGujarati ? 'વોટ્સએપ પૂછપરછ' : 'WhatsApp Query'}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
