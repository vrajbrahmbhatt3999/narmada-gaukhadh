import { motion, type Variants } from 'framer-motion'
import { Recycle, Leaf, Sprout, Award, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/features/i18n/LanguageContext'

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export function ProcessSection() {
  const { isGujarati } = useLanguage()

  const steps = isGujarati
    ? [
        {
          icon: Recycle,
          step: '01',
          title: 'દેશી ગીર ગાયના છાણનો સંગ્રહ',
          description:
            'ગૌશાળામાંથી શુદ્ધ દેશી ગીર ગાયનું તાજું છાણ અને ગૌમૂત્ર એકત્રિત કરી પ્રાકૃતિક પાચન પ્રક્રિયા માટે તૈયાર કરવામાં આવે છે.',
        },
        {
          icon: Leaf,
          step: '02',
          title: 'પંચગવ્ય અને જીવામૃત સંવર્ધન',
          description:
            'દૂધ, દહીં, ઘી, ગોળ અને કઠોળના લોટથી સમૃદ્ધ જીવામૃતનું મિશ્રણ કરી કરોડો ઉપયોગી બેક્ટેરિયા અને સૂક્ષ્મ જીવો ઉમેરાય છે.',
        },
        {
          icon: Sprout,
          step: '03',
          title: 'ઓસ્ટ્રેલિયન અળસિયા દ્વારા પાચન',
          description:
            'છાંયડાવાળા કુદરતી વાતાવરણમાં ૬૦ થી ૯૦ દિવસ સુધી અળસિયા દ્વારા કુદરતી રીતે કાળું સોનું (હ્યુમસ) તૈયાર થાય છે.',
        },
        {
          icon: Award,
          step: '04',
          title: 'ગાળણ અને શુદ્ધ સુરક્ષિત પેકિંગ',
          description:
            'ઝીણી જાળીથી ગાળીને અળસિયા અને ઈંડા અલગ કરી, યોગ્ય ભેજ સાથે ૧ કિલો, ૫ કિલો અને ૨૫ કિલોની થેલીઓમાં પેક થાય છે.',
        },
      ]
    : [
        {
          icon: Recycle,
          step: '01',
          title: 'Pure Gir Cow Dung Collection',
          description:
            'Fresh, chemical-free desi Gir cow dung and gomutra are collected from natural gaushalas as the organic foundation.',
        },
        {
          icon: Leaf,
          step: '02',
          title: 'Panchagavya Microbial Curing',
          description:
            'Enriched with traditional Panchagavya, jaggery, and microbial flora to activate millions of beneficial soil enzymes.',
        },
        {
          icon: Sprout,
          step: '03',
          title: 'Natural Earthworm Digestion',
          description:
            'Earthworms process the biomass over 60-90 days in temperature-controlled beds into odorless, nutrient-dense humus.',
        },
        {
          icon: Award,
          step: '04',
          title: 'Precision Sieving & Moisture Lock',
          description:
            'Carefully sieved to fine tea-powder texture, moisture-sealed, and packaged in 1kg, 5kg, and 25kg eco-friendly bags.',
        },
      ]

  return (
    <section className="section py-20 bg-white relative overflow-hidden" aria-label="Production process">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <span>✦</span>
            <span>{isGujarati ? 'ઉત્પાદન પદ્ધતિ' : 'Our Sustainable Method'}</span>
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            {isGujarati ? 'સંપૂર્ણ કુદરતી પંચગવ્ય નિર્માણ પ્રક્રિયા' : 'Rooted In Traditional Panchagavya Farming'}
          </h2>
          <p className="section-subtitle mx-auto text-stone-600 text-sm sm:text-base leading-relaxed">
            {isGujarati
              ? 'નર્મદા ગૌખાધ માત્ર ખાતર નથી, પણ તમારી જમીનનું આયુષ્ય અને ફળદ્રુપતા વધારતી પ્રાકૃતિક જીવનશૈલી છે.'
              : 'Our vermicompost is crafted using time-honored cow-based Vedic inputs and natural vermiculture to breathe life back into depleted agricultural soils.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual: Farm Photo with Gir Cow and Vermiculture beds */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img
                src="/assets/images/cow_farm_process.jpg"
                alt="Gir Cow and traditional vermicompost preparation beds in Gujarat"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              
              {/* Photo Caption Badge */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                  {isGujarati ? 'સજીવ પ્રાકૃતિક ખેતી' : 'Live Heritage Farm'}
                </span>
                <p className="font-serif text-sm font-semibold text-white/95">
                  {isGujarati ? 'દેશી ગીર ગાય અને વર્મીકમ્પોસ્ટ બેડ્સ, ગુજરાત' : 'Desi Gir Cows & Vermicomposting Beds, Gujarat'}
                </p>
              </div>
            </div>

            {/* Quick Benefits Card */}
            <div className="mt-5 p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex flex-col gap-2.5">
              {[
                isGujarati ? '૧૦૦% શુદ્ધ દેશી ગાયનું છાણ આધારિત' : '100% Desi Gir Cow Dung Foundation',
                isGujarati ? 'અળસિયા અને પાચક બેક્ટેરિયાથી સમૃદ્ધ' : 'Teeming with Earthworms & Active Soil Microbes',
                isGujarati ? 'કોઈપણ કેમિકલ કે યુરિયા વગર' : 'Zero Synthetic Chemicals, Urea, or Fillers',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-stone-700">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Steps Timeline */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {steps.map(({ icon: Icon, step, title, description }) => (
              <motion.div
                key={step}
                variants={fadeLeft}
                className="flex items-start gap-5 p-5 rounded-2xl bg-stone-50 hover:bg-stone-100/80 transition-all border border-stone-200/80 hover:border-emerald-300 shadow-sm group"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#214E34] text-white shadow-md group-hover:scale-110 transition-transform">
                    <Icon size={22} className="text-emerald-300" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">
                      {isGujarati ? `પગલું ${step}` : `STEP ${step}`}
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
