import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, FileText, CheckCircle2, ShieldCheck, PhoneCall, Sparkles, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/features/i18n/LanguageContext'
import { SITE_CONFIG } from '@/config/products'
import { BrochureModal } from '@/components/brochure/BrochureModal'

export function BrochureSection() {
  const { isGujarati } = useLanguage()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState(1)

  const openPage = (pageNum: number) => {
    setSelectedPage(pageNum)
    setModalOpen(true)
  }

  const pages = [
    {
      num: 1,
      title: isGujarati ? 'સત્તાવાર કવર' : 'Official Cover',
      subtitle: isGujarati ? 'શિવાય ડેરી ફાર્મ & નર્મદા ગૌખાધ' : 'Shivay Dairy Farm & Brand',
      thumb: '/assets/images/brochure/page-1-thumb.webp',
      badge: isGujarati ? 'કવર પેજ' : 'Cover',
    },
    {
      num: 2,
      title: isGujarati ? 'વર્મીકમ્પોસ્ટ માર્ગદર્શિકા' : 'Vermicompost Guide',
      subtitle: isGujarati ? '૧kg, ૫kg, ૨૫kg પેકિંગ & ૬ પગલાં' : '1kg, 5kg, 25kg & 6 Steps',
      thumb: '/assets/images/brochure/page-2-thumb.webp',
      badge: isGujarati ? 'પેકિંગ & ફાયદા' : 'Packs & Steps',
    },
    {
      num: 3,
      title: isGujarati ? 'વિંધ્યાચલ પ્રવાહી ખાતર' : 'Vidhyanchal Vermiwash',
      subtitle: isGujarati ? '૫૦૦ml, ૧Ltr & માટી બચાવો તથ્યો' : '500ml, 1Ltr & Soil Crisis',
      thumb: '/assets/images/brochure/page-3-thumb.webp',
      badge: isGujarati ? 'પ્રવાહી બાયો-ટોનિક' : 'Liquid Bio-Tonic',
    },
    {
      num: 4,
      title: isGujarati ? 'AAU લેબ ટેસ્ટ સર્ટિફિકેટ' : 'AAU Lab Test Report',
      subtitle: isGujarati ? 'આણંદ કૃષિ યુનિવર્સિટી ચકાસણી' : 'Anand Agricultural Univ.',
      thumb: '/assets/images/brochure/page-4-thumb.webp',
      badge: isGujarati ? 'લેબ પ્રમાણપત્ર' : 'Lab Certificate',
    },
  ]

  return (
    <section className="section bg-stone-100/70 relative overflow-hidden" id="brochure" aria-label="Official Brochure">
      {/* Background embellishments */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(33,78,52,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(138,98,70,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 border bg-white text-forest shadow-xs border-forest/20">
            <Sparkles size={13} className="text-emerald-600" />
            <span>
              {isGujarati
                ? 'સત્તાવાર ગુજરાતી માર્ગદર્શિકા & લેબ પ્રમાણપત્ર'
                : 'Official Gujarati Brochure & AAU Lab Report'}
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-dark)' }}
          >
            {isGujarati ? 'નર્મદા ગૌખાધ સત્તાવાર બ્રોશર' : 'Download Official Farm Brochure'}
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {isGujarati
              ? 'ખાતર બનાવવાની વિશિષ્ટ પદ્ધતિ, ૧૦૦% દેશી ગીર ગાય આધારિત પંચગવ્ય, આણંદ કૃષિ યુનિવર્સિટી લેબ પ્રમાણપત્ર અને વપરાશના ૬ સરળ પગલાં સાથે સંપૂર્ણ પુસ્તિકા.'
              : 'Complete scientific guide detailing the 45-day Panchagavya vermicomposting process, pack sizes, Anand Agricultural University (AAU) lab test analysis, and step-by-step usage.'}
          </p>
        </div>

        {/* 4-Page Grid Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {pages.map((p) => (
            <motion.div
              key={p.num}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => openPage(p.num)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              {/* Preview image */}
              <div className="relative aspect-[3/4] bg-stone-900 overflow-hidden">
                <img
                  src={p.thumb}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 px-3 py-1.5 rounded-full bg-forest text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <Eye size={13} />
                    <span>{isGujarati ? 'મોટું જુઓ' : 'Preview'}</span>
                  </span>
                </div>
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-forest shadow-xs backdrop-blur-xs">
                    {p.badge}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span className="w-5 h-5 rounded-full bg-black/60 text-white text-[10px] font-bold flex items-center justify-center">
                    {p.num}
                  </span>
                </div>
              </div>

              {/* Title & subtitle */}
              <div className="p-3 sm:p-4 flex flex-col flex-grow bg-white">
                <h3 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-forest transition-colors line-clamp-1 mb-1">
                  {p.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {p.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights & Lab Test Box */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-8 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Left: AAU Lab Test Certificate Highlight */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck size={20} />
                <span className="font-bold text-xs tracking-wider uppercase">
                  {isGujarati ? 'આણંદ કૃષિ યુનિવર્સિટી ચકાસણી' : 'Anand Agricultural University Certified'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                {isGujarati
                  ? 'સેન્દ્રિય કાર્બન ૩૧.૭૧% — પ્રમાણિત ઉચ્ચતમ ગુણવત્તા'
                  : '31.71% Organic Carbon — Certified Highest Grade Soil Nutrition'}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {isGujarati
                  ? 'આણંદ કૃષિ યુનિવર્સિટીના કૃષિ રસાયણ અને જમીન વિજ્ઞાન વિભાગ દ્વારા થયેલ લેબ ચકાસણી મુજબ નર્મદા ગૌખાધમાં નાઈટ્રોજન (૦.૮૭%), ફોસ્ફરસ (૦.૨૬%), પોટાશ (૦.૫૪%) અને ૩૧.૭૧% કાર્બન હાજર છે.'
                  : 'Official laboratory analysis conducted by the Department of Agricultural Chemistry & Soil Science, AAU Anand, confirming superior bio-nutrient values (Total N: 0.87%, P: 0.26%, K: 0.54%, Organic Carbon: 31.71%).'}
              </p>

              {/* 4 Stats Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-forest/5 border border-forest/15 text-center">
                  <span className="block text-base sm:text-lg font-extrabold text-forest">31.71%</span>
                  <span className="text-[10px] sm:text-xs text-stone-600 font-medium">
                    {isGujarati ? 'સેન્દ્રિય કાર્બન (OC)' : 'Organic Carbon'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-forest/5 border border-forest/15 text-center">
                  <span className="block text-base sm:text-lg font-extrabold text-forest">0.87%</span>
                  <span className="text-[10px] sm:text-xs text-stone-600 font-medium">
                    {isGujarati ? 'નાઈટ્રોજન (N)' : 'Total Nitrogen'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-forest/5 border border-forest/15 text-center">
                  <span className="block text-base sm:text-lg font-extrabold text-forest">0.26%</span>
                  <span className="text-[10px] sm:text-xs text-stone-600 font-medium">
                    {isGujarati ? 'ફોસ્ફરસ (P)' : 'Total Phosphorus'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-forest/5 border border-forest/15 text-center">
                  <span className="block text-base sm:text-lg font-extrabold text-forest">0.54%</span>
                  <span className="text-[10px] sm:text-xs text-stone-600 font-medium">
                    {isGujarati ? 'પોટાશ (K)' : 'Total Potassium'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Card */}
            <div className="lg:border-l lg:border-stone-200/80 lg:pl-6 flex flex-col justify-center gap-3">
              <a
                href={SITE_CONFIG.brochurePdf}
                download={SITE_CONFIG.brochureDirectName}
                className="btn btn-primary btn-lg shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2 font-bold text-sm"
              >
                <Download size={18} />
                <span>{isGujarati ? 'સંપૂર્ણ PDF ડાઉનલોડ કરો (૧૯ MB)' : 'Download Full PDF (19 MB)'}</span>
              </a>

              <button
                type="button"
                onClick={() => openPage(1)}
                className="btn btn-outline btn-lg flex items-center justify-center gap-2 font-semibold text-sm hover:bg-forest/5 text-forest border-forest/30"
              >
                <Eye size={17} />
                <span>{isGujarati ? 'વેબસાઇટ પર બ્રોશર જુઓ' : 'Preview Online (4 Pages)'}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-1">
                <PhoneCall size={13} className="text-emerald-700" />
                <span>
                  {isGujarati ? 'હેલ્પલાઇન: ' : 'Helpline: '}
                  <a href={`tel:${SITE_CONFIG.phone}`} className="font-bold text-stone-700 hover:text-forest">
                    {SITE_CONFIG.phone}
                  </a>
                  {SITE_CONFIG.secondaryPhone && (
                    <>
                      {' / '}
                      <a href={`tel:${SITE_CONFIG.secondaryPhone}`} className="font-bold text-stone-700 hover:text-forest">
                        {SITE_CONFIG.secondaryPhone}
                      </a>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <BrochureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPage={selectedPage}
      />
    </section>
  )
}
