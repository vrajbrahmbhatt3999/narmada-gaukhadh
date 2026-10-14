import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Sprout, ShoppingCart, MessageCircle, Calendar, Sparkles, Check, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/features/i18n/LanguageContext'
import { useCart } from '@/features/cart/CartContext'
import { PRODUCTS, formatPrice } from '@/config/products'
import { openWhatsApp } from '@/lib/whatsapp'

interface CropOption {
  id: string
  nameEn: string
  nameGu: string
  vermiPerVigha: number // kg per vigha (1 Acre = 2.5 Vigha)
  liquidPerVigha: number // Litres per vigha
  icon: string
}

const FARM_CROPS: CropOption[] = [
  { id: 'cotton', nameEn: 'Cotton (કપાસ)', nameGu: 'કપાસ', vermiPerVigha: 250, liquidPerVigha: 1.5, icon: '🌱' },
  { id: 'wheat', nameEn: 'Wheat (ઘઉં)', nameGu: 'ઘઉં', vermiPerVigha: 200, liquidPerVigha: 1.0, icon: '🌾' },
  { id: 'groundnut', nameEn: 'Groundnut (મગફળી)', nameGu: 'મગફળી', vermiPerVigha: 200, liquidPerVigha: 1.0, icon: '🥜' },
  { id: 'sugarcane', nameEn: 'Sugarcane (શેરડી)', nameGu: 'શેરડી', vermiPerVigha: 400, liquidPerVigha: 2.5, icon: '🎋' },
  { id: 'vegetables', nameEn: 'Vegetables (શાકભાજી)', nameGu: 'શાકભાજી / મરચી / ટામેટા', vermiPerVigha: 300, liquidPerVigha: 2.0, icon: '🍅' },
  { id: 'orchard', nameEn: 'Fruit Orchard (બાગાયત)', nameGu: 'કેરી / દાડમ / ચીકુ (બાગાયત)', vermiPerVigha: 350, liquidPerVigha: 2.0, icon: '🥭' },
]

export function DosageCalculatorSection() {
  const { t, isGujarati } = useLanguage()
  const { addItem } = useCart()

  // State
  const [mode, setMode] = useState<'farm' | 'garden'>('farm')
  const [selectedCropId, setSelectedCropId] = useState<string>('cotton')
  const [areaValue, setAreaValue] = useState<number>(2)
  const [areaUnit, setAreaUnit] = useState<'vigha' | 'acre' | 'hectare' | 'pots' | 'sqft'>('vigha')
  const [soilType, setSoilType] = useState<'normal' | 'sandy' | 'clay'>('normal')
  const [addedToast, setAddedToast] = useState(false)

  // Switch units when mode changes
  const handleModeChange = (newMode: 'farm' | 'garden') => {
    setMode(newMode)
    if (newMode === 'garden') {
      setAreaUnit('pots')
      setAreaValue(15)
    } else {
      setAreaUnit('vigha')
      setAreaValue(2)
      setSelectedCropId('cotton')
    }
  }

  // Calculate results
  const calculation = useMemo(() => {
    let multiplier = 1.0
    if (soilType === 'sandy') multiplier = 1.2
    if (soilType === 'clay') multiplier = 0.95

    let totalVermiKg = 0
    let totalLiquidL = 0

    if (mode === 'farm') {
      const crop = FARM_CROPS.find((c) => c.id === selectedCropId) ?? FARM_CROPS[0]
      // Convert area to Vigha
      let areaInVigha = areaValue
      if (areaUnit === 'acre') areaInVigha = areaValue * 2.5
      if (areaUnit === 'hectare') areaInVigha = areaValue * 6.25

      totalVermiKg = Math.round(crop.vermiPerVigha * areaInVigha * multiplier)
      totalLiquidL = Math.max(0.5, Math.round(crop.liquidPerVigha * areaInVigha * multiplier * 10) / 10)
    } else {
      // Garden mode
      if (areaUnit === 'pots') {
        // ~350g vermicompost per pot, ~50ml Vidhyanchal per 5 pots
        totalVermiKg = Math.max(5, Math.ceil((areaValue * 0.35 * multiplier) / 5) * 5)
        totalLiquidL = Math.max(0.5, Math.ceil((areaValue * 0.02) * 2) / 2)
      } else {
        // Sq. ft
        totalVermiKg = Math.max(5, Math.ceil((areaValue * 0.08 * multiplier) / 5) * 5)
        totalLiquidL = Math.max(0.5, Math.ceil((areaValue * 0.002) * 2) / 2)
      }
    }

    // Determine pack recommendations
    // Vermicompost variants: 50kg, 25kg, 5kg
    const bags50 = Math.floor(totalVermiKg / 50)
    const remAfter50 = totalVermiKg % 50
    const bags25 = Math.floor(remAfter50 / 25)
    const remAfter25 = remAfter50 % 25
    const bags5 = Math.ceil(remAfter25 / 5)

    // Vidhyanchal variants: 5L, 1L, 500ml
    const cans5L = Math.floor(totalLiquidL / 5)
    const remAfter5L = totalLiquidL % 5
    const bottles1L = Math.floor(remAfter5L / 1)
    const remAfter1L = remAfter5L % 1
    const bottles500ml = remAfter1L > 0 ? 1 : 0

    // Approximate cost estimation using PRODUCTS config
    const vermiProduct = PRODUCTS.find((p) => p.category === 'solid')
    const liquidProduct = PRODUCTS.find((p) => p.category === 'liquid')

    const p50 = vermiProduct?.variants.find((v) => v.id === 'vc-50kg')?.priceInr ?? 899
    const p25 = vermiProduct?.variants.find((v) => v.id === 'vc-25kg')?.priceInr ?? 499
    const p5 = vermiProduct?.variants.find((v) => v.id === 'vc-5kg')?.priceInr ?? 149

    const p5L = liquidProduct?.variants.find((v) => v.id === 'vid-5l')?.priceInr ?? 1199
    const p1L = liquidProduct?.variants.find((v) => v.id === 'vid-1l')?.priceInr ?? 299
    const p500 = liquidProduct?.variants.find((v) => v.id === 'vid-500ml')?.priceInr ?? 179

    const estimatedCost =
      bags50 * p50 + bags25 * p25 + bags5 * p5 + cans5L * p5L + bottles1L * p1L + bottles500ml * p500

    return {
      totalVermiKg,
      totalLiquidL,
      bags50,
      bags25,
      bags5,
      cans5L,
      bottles1L,
      bottles500ml,
      estimatedCost,
      vermiProduct,
      liquidProduct,
    }
  }, [mode, selectedCropId, areaValue, areaUnit, soilType])

  // Add all calculated items to cart
  const handleAddToCart = () => {
    const { vermiProduct, liquidProduct, bags50, bags25, bags5, cans5L, bottles1L, bottles500ml } = calculation

    if (vermiProduct) {
      if (bags50 > 0) {
        const v = vermiProduct.variants.find((item) => item.id === 'vc-50kg')!
        addItem({ productId: vermiProduct.id, productName: vermiProduct.name, variantId: v.id, variantLabel: v.label, sku: v.sku, pricePerUnit: v.priceInr, quantity: bags50 })
      }
      if (bags25 > 0) {
        const v = vermiProduct.variants.find((item) => item.id === 'vc-25kg')!
        addItem({ productId: vermiProduct.id, productName: vermiProduct.name, variantId: v.id, variantLabel: v.label, sku: v.sku, pricePerUnit: v.priceInr, quantity: bags25 })
      }
      if (bags5 > 0) {
        const v = vermiProduct.variants.find((item) => item.id === 'vc-5kg')!
        addItem({ productId: vermiProduct.id, productName: vermiProduct.name, variantId: v.id, variantLabel: v.label, sku: v.sku, pricePerUnit: v.priceInr, quantity: bags5 })
      }
    }

    if (liquidProduct) {
      if (cans5L > 0) {
        const v = liquidProduct.variants.find((item) => item.id === 'vid-5l')!
        addItem({ productId: liquidProduct.id, productName: liquidProduct.name, variantId: v.id, variantLabel: v.label, sku: v.sku, pricePerUnit: v.priceInr, quantity: cans5L })
      }
      if (bottles1L > 0) {
        const v = liquidProduct.variants.find((item) => item.id === 'vid-1l')!
        addItem({ productId: liquidProduct.id, productName: liquidProduct.name, variantId: v.id, variantLabel: v.label, sku: v.sku, pricePerUnit: v.priceInr, quantity: bottles1L })
      }
      if (bottles500ml > 0) {
        const v = liquidProduct.variants.find((item) => item.id === 'vid-500ml')!
        addItem({ productId: liquidProduct.id, productName: liquidProduct.name, variantId: v.id, variantLabel: v.label, sku: v.sku, pricePerUnit: v.priceInr, quantity: bottles500ml })
      }
    }

    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 3500)
  }

  // Consult on WhatsApp
  const handleConsultWhatsApp = () => {
    const cropName = mode === 'farm'
      ? (FARM_CROPS.find((c) => c.id === selectedCropId)?.nameGu ?? 'ખેતી પાક')
      : (areaUnit === 'pots' ? 'કુંડાના છોડ' : 'બગીચો')

    const message = isGujarati
      ? `નમસ્તે નર્મદા ગૌખાધ!\n\nમેં તમારી વેબસાઇટ પર ખાતર કેલ્ક્યુલેટર વાપર્યું:\n- પાક: ${cropName}\n- વિસ્તાર: ${areaValue} ${areaUnit}\n- જરૂરી અળસિયા ખાતર: ${calculation.totalVermiKg} કિ.ગ્રા.\n- જરૂરી વિંધ્યાચલ પ્રવાહી: ${calculation.totalLiquidL} લીટર\n- અંદાજિત કિંમત: ₹${calculation.estimatedCost}\n\nકૃપા કરીને આ ઓર્ડર અને ખેતી સલાહ માટે મદદ કરો.`
      : `Hello Narmada Gaukhadh!\n\nI used your Fertilizer Calculator:\n- Crop: ${cropName}\n- Area: ${areaValue} ${areaUnit}\n- Recommended Vermicompost: ${calculation.totalVermiKg} kg\n- Recommended Vidhyanchal: ${calculation.totalLiquidL} Litres\n- Est. Cost: ₹${calculation.estimatedCost}\n\nPlease guide me on ordering and delivery.`

    openWhatsApp(message)
  }

  return (
    <section id="calculator" className="section relative overflow-hidden" style={{ background: 'var(--color-cream)' }}>
      {/* Background organic shape */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{ background: 'rgba(74, 124, 89, 0.2)' }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 text-white" style={{ background: 'var(--color-forest)' }}>
            <Calculator size={14} />
            <span>{t.calcSectionTag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}>
            {t.calcTitle}
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {t.calcSubtitle}
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-stone-200">
            {/* Mode Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                {isGujarati ? 'વપરાશનો હેતુ પસંદ કરો' : 'Select Purpose'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleModeChange('farm')}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 border ${
                    mode === 'farm'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  <span className="text-base">🌾</span>
                  <span>{t.calcTypeFarm}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('garden')}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 border ${
                    mode === 'garden'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  <span className="text-base">🏡</span>
                  <span>{t.calcTypeGarden}</span>
                </button>
              </div>
            </div>

            {/* Crop Selector (if Farm mode) */}
            {mode === 'farm' ? (
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  {t.calcSelectCrop}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {FARM_CROPS.map((crop) => {
                    const isSelected = selectedCropId === crop.id
                    return (
                      <button
                        key={crop.id}
                        type="button"
                        onClick={() => setSelectedCropId(crop.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        <span className="text-xl flex-shrink-0">{crop.icon}</span>
                        <span className="text-xs sm:text-sm truncate">
                          {isGujarati ? crop.nameGu : crop.nameEn}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {/* Area Input & Unit Switcher */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                {t.calcEnterArea}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 relative">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={areaValue || ''}
                    onChange={(e) => setAreaValue(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-full text-xl font-bold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-stone-800"
                    placeholder="Enter area"
                  />
                  <span className="absolute right-3 top-3.5 text-xs text-stone-400 font-medium">
                    {mode === 'farm' ? 'Scale' : 'Quantity'}
                  </span>
                </div>

                <div>
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as any)}
                    className="w-full h-full px-3 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 font-semibold text-sm focus:outline-none focus:border-emerald-600"
                  >
                    {mode === 'farm' ? (
                      <>
                        <option value="vigha">{t.calcUnitVigha}</option>
                        <option value="acre">{t.calcUnitAcre}</option>
                        <option value="hectare">{t.calcUnitHectare}</option>
                      </>
                    ) : (
                      <>
                        <option value="pots">{t.calcUnitPots}</option>
                        <option value="sqft">{t.calcUnitSqFt}</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Soil Condition Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                {t.calcSelectSoil}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: t.calcSoilNormal },
                  { id: 'sandy', label: t.calcSoilSandy },
                  { id: 'clay', label: t.calcSoilClay },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSoilType(s.id as any)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
                      soilType === s.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Application Schedule Accordion */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <Calendar size={14} className="text-emerald-700" />
                <span>{t.calcScheduleTitle}</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100/80">
                  <span className="font-bold text-emerald-950 block">{t.calcStage1Title}</span>
                  <span className="text-stone-600">{t.calcStage1Desc}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100/80">
                  <span className="font-bold text-amber-950 block">{t.calcStage2Title}</span>
                  <span className="text-stone-600">{t.calcStage2Desc}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100/80">
                  <span className="font-bold text-emerald-950 block">{t.calcStage3Title}</span>
                  <span className="text-stone-600">{t.calcStage3Desc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5">
            <motion.div
              layout
              className="bg-emerald-950 text-white rounded-2xl p-4 sm:p-8 shadow-xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #163624 0%, #0d2317 100%)',
                boxShadow: '0 20px 40px -15px rgba(13, 35, 23, 0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-800/60">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-0.5">
                    {t.calcRecommendedDose}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {mode === 'farm'
                      ? (FARM_CROPS.find((c) => c.id === selectedCropId)?.nameGu ?? 'ખેતી પાક')
                      : (areaUnit === 'pots' ? `${areaValue} કુંડા માટે` : `${areaValue} ચો.ફૂટ બગીચા માટે`)}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-300">
                  <Sparkles size={20} />
                </div>
              </div>

              {/* Requirement Cards */}
              <div className="space-y-4 mb-6">
                {/* Vermicompost Requirement */}
                <div className="bg-emerald-900/40 border border-emerald-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-emerald-300 font-medium">
                      {t.calcVermicompostLabel}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-700/60 text-emerald-100 font-mono">
                      Solid
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-2">
                    {calculation.totalVermiKg}{' '}
                    <span className="text-base font-normal text-emerald-300">kg</span>
                  </div>
                  <div className="text-xs text-emerald-200/90 flex flex-wrap gap-2 pt-2 border-t border-emerald-800/50">
                    <span className="font-semibold">{isGujarati ? 'પેકિંગ વિગત:' : 'Pack Split:'}</span>
                    {calculation.bags50 > 0 && (
                      <span className="bg-emerald-800/80 px-2 py-0.5 rounded">
                        {calculation.bags50} × 50kg {isGujarati ? 'બેગ' : 'bag'}
                      </span>
                    )}
                    {calculation.bags25 > 0 && (
                      <span className="bg-emerald-800/80 px-2 py-0.5 rounded">
                        {calculation.bags25} × 25kg {isGujarati ? 'બેગ' : 'bag'}
                      </span>
                    )}
                    {calculation.bags5 > 0 && (
                      <span className="bg-emerald-800/80 px-2 py-0.5 rounded">
                        {calculation.bags5} × 5kg {isGujarati ? 'બેગ' : 'bag'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Vidhyanchal Requirement */}
                <div className="bg-emerald-900/40 border border-emerald-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-emerald-300 font-medium">
                      {t.calcVidhyanchalLabel}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-700/60 text-amber-100 font-mono">
                      Liquid
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-2">
                    {calculation.totalLiquidL}{' '}
                    <span className="text-base font-normal text-emerald-300">Litre</span>
                  </div>
                  <div className="text-xs text-emerald-200/90 flex flex-wrap gap-2 pt-2 border-t border-emerald-800/50">
                    <span className="font-semibold">{isGujarati ? 'પેકિંગ વિગત:' : 'Pack Split:'}</span>
                    {calculation.cans5L > 0 && (
                      <span className="bg-emerald-800/80 px-2 py-0.5 rounded">
                        {calculation.cans5L} × 5L {isGujarati ? 'કેન' : 'can'}
                      </span>
                    )}
                    {calculation.bottles1L > 0 && (
                      <span className="bg-emerald-800/80 px-2 py-0.5 rounded">
                        {calculation.bottles1L} × 1L {isGujarati ? 'બોટલ' : 'bottle'}
                      </span>
                    )}
                    {calculation.bottles500ml > 0 && (
                      <span className="bg-emerald-800/80 px-2 py-0.5 rounded">
                        {calculation.bottles500ml} × 500ml {isGujarati ? 'બોટલ' : 'bottle'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Estimate */}
              <div className="bg-emerald-900/70 rounded-xl p-4 mb-6 flex items-center justify-between border border-emerald-600/40">
                <div>
                  <span className="text-xs text-emerald-300 block">{t.calcEstCost}</span>
                  <span className="text-xs text-stone-300">
                    {isGujarati ? '(સરનામે ફ્રી ડિલિવરી સાથે)' : '(Estimated total investment)'}
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-300">
                  {formatPrice(calculation.estimatedCost)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-900/50 active:scale-98"
                >
                  {addedToast ? (
                    <>
                      <Check size={18} className="text-emerald-950" />
                      <span>{t.calcAddedToCart}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>{t.calcAddToCart}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleConsultWhatsApp}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs border border-emerald-500/50 text-emerald-200 hover:bg-emerald-900/60 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} className="text-emerald-400" />
                  <span>{t.calcConsultWhatsApp}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
