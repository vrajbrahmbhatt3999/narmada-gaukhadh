import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'gu'

export interface Translations {
  // Navigation
  navHome: string
  navShop: string
  navCalculator: string
  navAbout: string
  navContact: string
  navCart: string
  orderOnWhatsApp: string
  announcement: string

  // Hero
  heroBadge: string
  heroTitle1: string
  heroTitle2: string
  heroTagline: string
  heroCtaShop: string
  heroCtaCalc: string
  heroBadgePurity: string
  heroBadgePuritySub: string
  heroBadgeFarmers: string
  heroBadgeFarmersSub: string
  heroBadgeCertified: string
  heroBadgeCertifiedSub: string

  // Calculator
  calcSectionTag: string
  calcTitle: string
  calcSubtitle: string
  calcTypeFarm: string
  calcTypeGarden: string
  calcSelectCrop: string
  calcSelectSoil: string
  calcEnterArea: string
  calcUnitVigha: string
  calcUnitAcre: string
  calcUnitHectare: string
  calcUnitPots: string
  calcUnitSqFt: string
  calcSoilNormal: string
  calcSoilSandy: string
  calcSoilClay: string
  calcResultsHeading: string
  calcRecommendedDose: string
  calcVermicompostLabel: string
  calcVidhyanchalLabel: string
  calcEstCost: string
  calcAddToCart: string
  calcAddedToCart: string
  calcConsultWhatsApp: string
  calcScheduleTitle: string
  calcStage1Title: string
  calcStage1Desc: string
  calcStage2Title: string
  calcStage2Desc: string
  calcStage3Title: string
  calcStage3Desc: string

  // Common Crops
  cropCotton: string
  cropWheat: string
  cropGroundnut: string
  cropSugarcane: string
  cropVegetables: string
  cropOrchard: string
  cropPots: string
  cropLawn: string

  // Products
  productShowcaseTag: string
  productShowcaseTitle: string
  productShowcaseSubtitle: string
  viewDetails: string
  addToCart: string
  availablePacks: string
  priceFrom: string
  freeDeliveryNote: string
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    navHome: 'Home',
    navShop: 'Shop',
    navCalculator: 'Dosage Calculator',
    navAbout: 'About Us',
    navContact: 'Contact',
    navCart: 'Cart',
    orderOnWhatsApp: 'Order via WhatsApp',
    announcement: '🌿 100% Cow-Based Natural Agricultural Products — Delivered Across India',

    // Hero
    heroBadge: 'Pure Vedic Panchagavya & Cow Dung Farming',
    heroTitle1: 'Revitalize Your Soil With',
    heroTitle2: 'Sacred Narmada Earth',
    heroTagline:
      'Boost crop yield, strengthen root resilience, and restore organic carbon using 100% natural Vermicompost and Panchagavya-formulated Vidhyanchal bio-fertilizer.',
    heroCtaShop: 'Explore Products',
    heroCtaCalc: 'Calculate Farm Dosage',
    heroBadgePurity: '100% Natural',
    heroBadgePuritySub: 'Zero chemical adulterants',
    heroBadgeFarmers: 'Farmer Trusted',
    heroBadgeFarmersSub: 'High microbial activity',
    heroBadgeCertified: 'Panchagavya Enriched',
    heroBadgeCertifiedSub: 'Traditional Indian science',

    // Calculator
    calcSectionTag: 'Precision Organic Farming',
    calcTitle: 'Interactive Dosage & Land Calculator',
    calcSubtitle:
      'Enter your crop type and land size in Vigha or Acre to calculate the exact scientific organic fertilizer requirement, application schedule, and cost.',
    calcTypeFarm: '🌾 Agricultural Crop (Farm)',
    calcTypeGarden: '🏡 Home Garden & Pots',
    calcSelectCrop: 'Select Your Crop',
    calcSelectSoil: 'Soil Condition',
    calcEnterArea: 'Enter Land Area',
    calcUnitVigha: 'Vigha (વીઘા)',
    calcUnitAcre: 'Acre (એકર)',
    calcUnitHectare: 'Hectare (હેક્ટર)',
    calcUnitPots: 'Number of Pots (કુંડા)',
    calcUnitSqFt: 'Square Feet (ચો.ફૂટ)',
    calcSoilNormal: 'Normal Loam Soil',
    calcSoilSandy: 'Sandy / Light Soil (+20% dose)',
    calcSoilClay: 'Heavy Black Cotton Soil',
    calcResultsHeading: 'Recommended Organic Nutrition Plan',
    calcRecommendedDose: 'Calculated Requirement',
    calcVermicompostLabel: 'Narmada Vermicompost (Solid)',
    calcVidhyanchalLabel: 'Narmada Vidhyanchal (Liquid Bio-Spray)',
    calcEstCost: 'Approx. Total Cost',
    calcAddToCart: 'Add Recommended Pack to Cart',
    calcAddedToCart: '✓ Added to Cart!',
    calcConsultWhatsApp: 'Consult Agri-Expert on WhatsApp',
    calcScheduleTitle: '3-Step Application Timeline',
    calcStage1Title: 'Stage 1: Soil Basal Dose (Before Sowing)',
    calcStage1Desc: 'Incorporate 70% of vermicompost during final ploughing to enrich organic carbon.',
    calcStage2Title: 'Stage 2: Growth & Foliar Spray (Day 25–30)',
    calcStage2Desc: 'Mix Vidhyanchal at 50ml per 15L spray pump or through drip irrigation.',
    calcStage3Title: 'Stage 3: Flowering & Fruit Booster (Day 50–60)',
    calcStage3Desc: 'Top-dress remaining vermicompost and spray Vidhyanchal for vibrant flowering.',

    // Common Crops
    cropCotton: 'Cotton (કપાસ)',
    cropWheat: 'Wheat (ઘઉં)',
    cropGroundnut: 'Groundnut (મગફળી)',
    cropSugarcane: 'Sugarcane (શેરડી)',
    cropVegetables: 'Vegetables / Chilly / Tomato (શાકભાજી)',
    cropOrchard: 'Fruit Orchard - Mango / Pomegranate (બાગાયત)',
    cropPots: 'Potted Plants & Bonsai (કુંડાના છોડ)',
    cropLawn: 'Home Lawn & Kitchen Garden (બગીચો)',

    // Products
    productShowcaseTag: 'Natural Farming Inputs',
    productShowcaseTitle: 'Our Certified Organic Formulations',
    productShowcaseSubtitle:
      'Specially developed for high yield, soil carbon enhancement, and sustainable agriculture.',
    viewDetails: 'View Details',
    addToCart: 'Add to Cart',
    availablePacks: 'Available Pack Sizes',
    priceFrom: 'Starting from',
    freeDeliveryNote: 'Free delivery on qualifying orders',
  },

  gu: {
    // Navigation
    navHome: 'મુખ્ય પૃષ્ઠ',
    navShop: 'ઉત્પાદનો',
    navCalculator: 'ખાતર કેલ્ક્યુલેટર',
    navAbout: 'અમારા વિશે',
    navContact: 'સંપર્ક',
    navCart: 'કાર્ટ',
    orderOnWhatsApp: 'વોટ્સએપ પર ઓર્ડર કરો',
    announcement: '🌿 ૧૦૦% ગૌ-આધારિત પ્રાકૃતિક કૃષિ ઉત્પાદનો — સમગ્ર ભારતમાં ડિલિવરી',

    // Hero
    heroBadge: 'શુદ્ધ વૈદિક પંચગવ્ય અને ગૌમૂત્ર-છાણ આધારિત કુદરતી ખેતી',
    heroTitle1: 'તમારી જમીનને સજીવ બનાવો',
    heroTitle2: 'નર્મદા ગૌખાધ સાથે',
    heroTagline:
      'જમીનની ફળદ્રુપતા વધારો, મૂળિયા મજબૂત કરો અને સેન્દ્રિય કાર્બન બમણો કરો — ૧૦૦% શુદ્ધ અળસિયા ખાતર અને પંચગવ્ય-યુક્ત વિંધ્યાચલ પ્રવાહી બાયો-ખાતર વડે.',
    heroCtaShop: 'ઉત્પાદનો જુઓ',
    heroCtaCalc: 'જમીન મુજબ ખાતર ગણો',
    heroBadgePurity: '૧૦૦% પ્રાકૃતિક',
    heroBadgePuritySub: 'કોઈપણ કેમિકલ ભેળસેળ વગર',
    heroBadgeFarmers: 'ખેડૂતોનો વિશ્વાસ',
    heroBadgeFarmersSub: 'અબજો સક્રિય સૂક્ષ્મ જીવાણુઓ',
    heroBadgeCertified: 'પંચગવ્ય સમૃદ્ધ',
    heroBadgeCertifiedSub: 'પરંપરાગત ભારતીય કૃષિ વિજ્ઞાન',

    // Calculator
    calcSectionTag: 'વૈજ્ઞાનિક સજીવ ખેતી ગણતરી',
    calcTitle: 'જમીન અને પાક અનુસાર ખાતર કેલ્ક્યુલેટર',
    calcSubtitle:
      'તમારો પાક અને જમીનનો વિસ્તાર (વીઘા અથવા એકર) પસંદ કરો, અને મેળવો તમારા પાક માટે જરૂરી ખાતરનું ચોક્કસ પ્રમાણ, છંટકાવ પદ્ધતિ અને અંદાજિત ખર્ચ.',
    calcTypeFarm: '🌾 ખેતી પાક (વાડી/ખેતર)',
    calcTypeGarden: '🏡 ઘર આંગણ, બગીચો અને કુંડા',
    calcSelectCrop: 'પાક પસંદ કરો',
    calcSelectSoil: 'જમીનનો પ્રકાર',
    calcEnterArea: 'જમીનનો વિસ્તાર દાખલ કરો',
    calcUnitVigha: 'વીઘા (Vigha)',
    calcUnitAcre: 'એકર (Acre)',
    calcUnitHectare: 'હેક્ટર (Hectare)',
    calcUnitPots: 'કુંડાની સંખ્યા (Pots)',
    calcUnitSqFt: 'ચોરસ ફૂટ (Sq.Ft)',
    calcSoilNormal: 'સામાન્ય કાળી/ગોરાડુ જમીન',
    calcSoilSandy: 'હલકી/રેતાળ જમીન (+૨૦% માત્રા)',
    calcSoilClay: 'ભારે કાળી માટીવાળી જમીન',
    calcResultsHeading: 'તમારા પાક માટે ભલામણ કરેલ પ્રાકૃતિક પોષણ યોજના',
    calcRecommendedDose: 'જરૂરી માત્રા (Calculated Dosage)',
    calcVermicompostLabel: 'નર્મદા અળસિયા ખાતર (ઘન)',
    calcVidhyanchalLabel: 'નર્મદા વિંધ્યાચલ પ્રવાહી બાયો-ટોનિક (સ્પ્રે)',
    calcEstCost: 'અંદાજિત કુલ કિંમત',
    calcAddToCart: 'જરૂરી ખાતર કાર્ટમાં ઉમેરો',
    calcAddedToCart: '✓ કાર્ટમાં ઉમેરાઈ ગયું!',
    calcConsultWhatsApp: 'કૃષિ સલાહકાર સાથે વોટ્સએપ પર ચર્ચા કરો',
    calcScheduleTitle: '૩ તબક્કામાં ખાતર આપવાની રીત (કેલેન્ડર)',
    calcStage1Title: 'તબક્કો ૧: પાયામાં ખાતર (વાવણી સમયે)',
    calcStage1Desc: 'ઓરવણી કે છેલ્લા ખેડ વખતે ૭૦% અળસિયા ખાતર જમીનમાં ભેળવી દેવું જેથી સેન્દ્રિય કાર્બન વધે.',
    calcStage2Title: 'તબક્કો ૨: વૃદ્ધિ સમયે સ્પ્રે (૨૫ થી ૩૦ દિવસે)',
    calcStage2Desc: '૧૫ લીટરના પંપમાં ૫૦ થી ૭૫ મિ.લી. વિંધ્યાચલ ઉમેરી છંટકાવ કરવો અથવા ડ્રિપમાં આપવું.',
    calcStage3Title: 'તબક્કો ૩: ફૂલ અને ફળના વિકાસ સમયે (૫૦ થી ૬૦ દિવસે)',
    calcStage3Desc: 'બાકી રહેલ અળસિયા ખાતર ચાસમાં આપવું અને વિંધ્યાચલનો બીજો સ્પ્રે કરવો.',

    // Common Crops
    cropCotton: 'કપાસ (Cotton)',
    cropWheat: 'ઘઉં (Wheat)',
    cropGroundnut: 'મગફળી (Groundnut)',
    cropSugarcane: 'શેરડી (Sugarcane)',
    cropVegetables: 'શાકભાજી / મરચી / ટામેટા (Vegetables)',
    cropOrchard: 'બાગાયતી પાક - કેરી, ચીકુ, દાડમ (Horticulture)',
    cropPots: 'કુંડાના ફૂલછોડ અને શાકભાજી (Pots)',
    cropLawn: 'ઘરનો લોન / કિચન ગાર્ડન (Lawn)',

    // Products
    productShowcaseTag: 'શુદ્ધ પ્રાકૃતિક ખાતરો',
    productShowcaseTitle: 'અમારા પ્રમાણિત સજીવ ઉત્પાદનો',
    productShowcaseSubtitle:
      'ઉત્પાદન વધારવા, જમીન સુધારણા અને ઝેરી કેમિકલમુક્ત તંદુરસ્ત ખેતી માટે શ્રેષ્ઠ પરિણામ.',
    viewDetails: 'વિગતવાર જુઓ',
    addToCart: 'કાર્ટમાં ઉમેરો',
    availablePacks: 'ઉપલબ્ધ પેકિંગ',
    priceFrom: 'શરૂઆતી કિંમત',
    freeDeliveryNote: 'નિયમ મુજબ ફ્રી હોમ ડિલિવરી',
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  isGujarati: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('narmada_lang') as Language
    return saved === 'gu' || saved === 'en' ? saved : 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('narmada_lang', lang)
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isGujarati: language === 'gu',
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
