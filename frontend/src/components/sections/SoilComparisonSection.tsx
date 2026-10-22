import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, Droplet, Sprout, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react'
import { useLanguage } from '@/features/i18n/LanguageContext'

export function SoilComparisonSection() {
  const { isGujarati } = useLanguage()
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical'>('organic')

  return (
    <section className="section py-20 bg-stone-100/70 border-y border-stone-200" aria-label="Soil Comparison">
      <div className="container max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-emerald-700" />
            <span>{isGujarati ? 'ખેતીમાં સાચો તફાવત' : 'The Real Farm Difference'}</span>
          </div>
          <h2 className="section-title text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            {isGujarati
              ? 'રાસાયણિક વિરુદ્ધ નર્મદા ગૌખાધ સજીવ ખેતી'
              : 'Chemical Fertilizers vs Narmada Gaukhadh'}
          </h2>
          <p className="section-subtitle mx-auto text-stone-600 text-sm sm:text-base">
            {isGujarati
              ? 'જુઓ કે કેવી રીતે પંચગવ્ય આધારિત અળસિયું ખાતર તમારી જમીનને કાયમી ફળદ્રુપ બનાવે છે.'
              : 'Discover how 100% cow-based natural vermiculture heals depleted soils and boosts crop vitality.'}
          </p>
        </div>

        {/* Interactive Toggle Pills */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-stone-200/80 shadow-inner">
            <button
              onClick={() => setActiveTab('organic')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'organic'
                  ? 'bg-[#214E34] text-white shadow-md scale-102'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CheckCircle size={16} className="text-emerald-300" />
              <span>{isGujarati ? 'નર્મદા ગૌખાધ (સજીવ ખેતી)' : 'Narmada Gaukhadh (Organic)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('chemical')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'chemical'
                  ? 'bg-rose-700 text-white shadow-md scale-102'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <AlertTriangle size={16} className="text-rose-200" />
              <span>{isGujarati ? 'રાસાયણિક ખાતરો (યુરિયા/DAP)' : 'Chemical Fertilizers (Urea/DAP)'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Animated Content Panel */}
        <AnimatePresence mode="wait">
          {activeTab === 'organic' ? (
            <motion.div
              key="organic"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-lg flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <Sprout size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {isGujarati ? 'જીવંત સૂક્ષ્મ જીવાણુઓ' : 'Living Microbial Ecosystem'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isGujarati
                    ? 'કરોડો ઉપયોગી બેક્ટેરિયા અને અળસિયા જમીનને પોચી બનાવી મૂળિયાંને ઊંડા ઉતારવામાં મદદ કરે છે.'
                    : 'Millions of beneficial aerobic microbes and natural earthworm casts aerate soil and unlock natural root growth.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-lg flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <Droplet size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {isGujarati ? '૩૦% વધુ ભેજ સંગ્રહ' : '30% Higher Water Retention'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isGujarati
                    ? 'હ્યુમસની રચનાને કારણે જમીન સ્પોન્જ જેવી બને છે, જેથી સિંચાઈના પાણીની બચત થાય છે.'
                    : 'Porous organic humus structure retains rainwater and ground moisture, requiring significantly less frequent irrigation.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-lg flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <TrendingUp size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {isGujarati ? 'લાંબા ગાળે વધુ નફો' : 'Higher Long-Term Farm Profits'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isGujarati
                    ? 'જમીનની કાયમી ફળદ્રુપતા વધે છે, ઝેરી રસાયણો વગર પાકનો સારો ભાવ અને ચોખ્ખો નફો મળે છે.'
                    : 'Soil regenerates each season instead of depleting, eliminating pesticide dependency and commanding premium organic prices.'}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chemical"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-lg flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 text-rose-800">
                  {isGujarati ? 'જમીન કઠણ અને બંજર' : 'Hardened, Dead Topsoil'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isGujarati
                    ? 'યુરિયા અને રાસાયણિક ખાતરોથી ઉપયોગી અળસિયા મરી જાય છે અને જમીનમાં પથ્થર જેવું પડ જામી જાય છે.'
                    : 'Synthetic salts kill off beneficial earthworms and microorganisms, creating dense impermeable soil crusts.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-lg flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                  <Droplet size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 text-rose-800">
                  {isGujarati ? 'પાણી અને પોષક તત્વોનો બગાડ' : 'Nutrient Leaching & Runoff'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isGujarati
                    ? 'સિંચાઈ કે વરસાદ સાથે મોટાભાગનું ખાતર ધોવાઈ જાય છે અને ભૂગર્ભ જળ પ્રદૂષિત થાય છે.'
                    : 'Over 60% of applied synthetic nitrogen washes away into groundwater tables, causing wasted fertilizer expenses.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-lg flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 text-rose-800">
                  {isGujarati ? 'વધતો ખર્ચ અને રોગચાળો' : 'Escalating Input Costs'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isGujarati
                    ? 'વર્ષોવર્ષ વધુ ખાતર નાખવું પડે છે, પાકની રોગપ્રતિકારક શક્તિ ઘટે છે અને ખર્ચ વધતો જાય છે.'
                    : 'Pest resistance surges while yields plateau, forcing farmers into an endless cycle of more chemical inputs.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
