import { useLanguage } from '@/features/i18n/LanguageContext'

export function TrustMarqueeRibbon() {
  const { isGujarati } = useLanguage()

  const items = isGujarati
    ? [
        '૧૦૦% શુદ્ધ દેશી ગાયનું છાણ',
        'પંચગવ્ય સમૃદ્ધ ફોર્મ્યુલા',
        'NPK એનરિચ્ડ અળસિયું ખાતર',
        'વિધ્યાંચળ લિક્વિડ બાયો-ટોનિક',
        '૧૦,૦૦૦+ ગુજરાતી ખેડૂતોનો વિશ્વાસ',
        'ઝીરો કેમિકલ • ૧૦૦% સજીવ ખેતી',
        'જમીનની ભેજ સંગ્રહ શક્તિમાં ૩૦% વધારો',
        'સમગ્ર ગુજરાત અને ભારતમાં ડિલિવરી',
      ]
    : [
        '100% PURE DESI GIR COW DUNG',
        'PANCHAGAVYA ENRICHED FORMULA',
        'NPK RICH ORGANIC VERMICOMPOST',
        'VIDHYANCHAL LIQUID BIO-FERTILIZER',
        'TRUSTED BY 10,000+ FARMERS',
        'ZERO CHEMICAL RESIDUE • 100% ORGANIC',
        '30% HIGHER SOIL MOISTURE RETENTION',
        'FAST PAN-INDIA DELIVERY',
      ]

  return (
    <div
      className="relative overflow-hidden py-3 sm:py-3.5 z-20 border-y shadow-inner"
      style={{
        background: 'linear-gradient(90deg, #163424 0%, #214E34 50%, #163424 100%)',
        borderColor: 'rgba(168, 213, 162, 0.25)',
      }}
    >
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-white/95">
        {[...items, ...items].map((item, idx) => (
          <span key={idx} className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">✦</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
