// ============================================================
// CENTRAL PRODUCT & BUSINESS CONFIGURATION
// Update this file before launch — do NOT duplicate data elsewhere
// ============================================================

export const SITE_CONFIG = {
  brandName: 'Narmada Gaukhadh',
  brandNameGujarati: 'નર્મદા ગૌખાધ',
  tagline: 'Pure Soil. Healthy Crops. Natural Farming.',
  description:
    'Premium natural agricultural products made using traditional cow-based farming practices and Panchagavya.',
  whatsappNumber: '918490047078',
  phone: '+91 84900 47078',
  secondaryPhone: '+91 77789 01397',
  email: '',
  address: 'Shivmay Dairy Farm, Nr. Patadiya Hanuman Canel, Patra',
  city: 'Vadodara',
  state: 'Gujarat',
  country: 'India',
  /** Official Brochure & Logo Assets */
  brochurePdf: '/NG-Brochure-Gujarati.pdf',
  brochureDirectName: 'Narmada-Gaukhadh-Gujarati-Brochure.pdf',
  logoUrl: '/assets/images/logo-web.png',
  logoCowUrl: '/assets/images/logo-cow.png',
  /** Production domain — update before launch for canonical URLs and OG tags */
  siteUrl: 'https://narmadagaukhadh.com',
  social: {
    facebook: 'https://www.facebook.com/NarmadaDairyFarm',
    instagram: '',
    youtube: '',
  },
  /** Announcement bar — set to empty string to hide */
  announcement:
    '🌿 ૧૦૦% શુદ્ધ દેશી ગીર ગાય આધારિત ખાતર — સત્તાવાર બ્રોશર ઉપલબ્ધ | WhatsApp: +91 84900 47078',
  freeDeliveryAbove: 999, // ₹ order value for free delivery
  defaultDeliveryCharge: 80, // ₹ delivery charge
}

// ============================================================
// PRODUCT CATALOG
// ============================================================

export interface PackVariant {
  id: string
  label: string
  priceInr: number // PLACEHOLDER — must be confirmed before launch
  weightOrVolume: string
  sku: string
}

export interface Product {
  id: string
  slug: string
  name: string
  nameGujarati: string
  shortDescription: string
  longDescription: string
  category: 'solid' | 'liquid'
  /** Images: actual product photos and infographics */
  images: string[]
  variants: PackVariant[]
  usageNote: string
  ingredients: string
  storageInstructions: string
  faqs: { question: string; answer: string }[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'vermicompost',
    slug: 'vermicompost',
    name: 'Narmada Gaukhadh Vermicompost',
    nameGujarati: 'નર્મદા ગૌખાધ અળસિયું ખાતર',
    shortDescription:
      '100% pure & organic vermicompost enriched with Panchagavya. Boosts plant growth, softens soil, enhances water retention, and is free of weed seeds and harmful chemicals.',
    longDescription:
      'Narmada Gaukhadh Vermicompost is an authentic, cow-based organic fertilizer enriched with traditional Panchagavya and produced at Shivmay Dairy Farm, Vadodara. It nourishes the soil naturally with high microbial biodiversity, essential NPK, and micronutrients.\n\nCrafted with zero synthetic additives and zero harmful chemicals, it restores organic carbon to the soil, conditions root zones, and ensures thriving, healthy yields across all crop cycles and home gardens.',
    category: 'solid',
    images: [
      '/assets/images/products/vermicompost-main.webp',
      '/assets/images/products/vermicompost-how-to-use.webp',
      '/assets/images/products/vermicompost-benefits.webp',
      '/assets/images/products/vermicompost-pure-organic.webp',
    ],
    variants: [
      { id: 'vc-1kg', label: '1 kg', priceInr: 99, weightOrVolume: '1 kg', sku: 'NG-VC-1KG' },
      { id: 'vc-5kg', label: '5 kg', priceInr: 349, weightOrVolume: '5 kg', sku: 'NG-VC-5KG' },
      { id: 'vc-25kg', label: '25 kg', priceInr: 999, weightOrVolume: '25 kg', sku: 'NG-VC-25KG' },
    ],
    usageNote:
      '1. Prepare the soil: Loosen the top layer of soil (1–2 inches) in a sunny spot.\n2. Mix Vermicompost: Mix Narmada Gaukhadh Vermicompost evenly into the soil before planting.\n3. Plant & Water: Sow seeds or saplings and water gently.\n4. Regular Application: Follow application schedules for repeat seasonal feeding.',
    ingredients:
      '100% Pure Cow Dung Compost, Earthworm Castings, enriched with Vedic Panchagavya inputs.',
    storageInstructions:
      'Store in a cool, dry, and well-ventilated space away from direct sunlight. Reseal the bag after opening.',
    faqs: [
      {
        question: 'What makes Narmada Gaukhadh Vermicompost unique?',
        answer:
          'It is prepared from pure cow dung and fortified with traditional Panchagavya at Shivmay Dairy Farm, ensuring higher biological activity, no weed seeds, and zero chemicals.',
      },
      {
        question: 'How do I use it for potted plants?',
        answer:
          'Loosen 1–2 inches of surface soil, mix in 150g–300g of Vermicompost per 12-inch pot, and water gently. Repeat every 3–4 weeks for optimal growth.',
      },
      {
        question: 'Is it suitable for vegetables, fruits, and flowers?',
        answer:
          'Yes! It is completely safe and highly beneficial for all flowering plants, lawn grass, kitchen garden vegetables, and open-field agricultural crops.',
      },
    ],
  },
  {
    id: 'vidhyanchal',
    slug: 'vidhyanchal',
    name: 'Vidhyanchal Vermiwash',
    nameGujarati: 'વિંધ્યાચલ વર્મીવોશ (Vermiwash)',
    shortDescription:
      '100% organic liquid vermiwash enriched with Panchagavya. Boosts plant growth, strengthens root systems, enhances soil health, and provides natural pest and disease resistance.',
    longDescription:
      'Vidhyanchal Vermiwash is a natural liquid biological plant tonic extracted during organic vermicomposting and enriched with Panchagavya. Packed with soluble nutrients, enzymes, amino acids, and beneficial growth-promoting microorganisms.\n\nFormulated for easy liquid application through foliar spraying or drip irrigation, Vidhyanchal penetrates foliage rapidly, stimulating early root vigor, lush greenery, and abundant flowering.',
    category: 'liquid',
    images: [
      '/assets/images/products/vidhyanchal-main.webp',
      '/assets/images/products/vidhyanchal-promotion.webp',
      '/assets/images/products/vidhyanchal-ad.webp',
    ],
    variants: [
      { id: 'vy-500ml', label: '500 ml', priceInr: 149, weightOrVolume: '500 ml', sku: 'NG-VY-500ML' },
      { id: 'vy-1l', label: '1 litre', priceInr: 249, weightOrVolume: '1 litre', sku: 'NG-VY-1L' },
      { id: 'vy-5l', label: '5 litres', priceInr: 799, weightOrVolume: '5 litres', sku: 'NG-VY-5L' },
      { id: 'vy-20l', label: '20 litres', priceInr: 2499, weightOrVolume: '20 litres', sku: 'NG-VY-20L' },
    ],
    usageNote:
      'Foliar Spray: Mix 50 ml per 15 litres of water in a spray pump. Spray evenly on leaves during early morning or sunset.\nDrip / Soil Application: 1–2 litres per acre mixed with irrigation water.\nGarden / Potted Plants: Mix 10 ml per litre of water and spray every 10–14 days.',
    ingredients:
      'Pure organic Vermiwash extract, fortified with fermented Panchagavya bio-enzymes and natural growth promoters.',
    storageInstructions:
      'Store in a cool, shaded place away from direct sunlight. Shake well before use. Keep cap tightly closed.',
    faqs: [
      {
        question: 'What is Vidhyanchal Vermiwash?',
        answer:
          'Vermiwash is a nutrient-rich organic liquid wash collected during earthworm digestion, enriched with Panchagavya. It contains essential plant growth hormones (auxins, cytokinins) and disease-suppressing microbes.',
      },
      {
        question: 'How do I apply Vidhyanchal Vermiwash?',
        answer:
          'Dilute with clean water (50ml per 15L spray tank, or 10ml per 1L for home plants) and spray directly onto foliage or drench the soil around roots.',
      },
      {
        question: 'Can I use Vermicompost and Vidhyanchal together?',
        answer:
          'Yes, they complement each other perfectly! Vermicompost provides long-lasting soil nourishment, while Vidhyanchal Vermiwash provides immediate foliar uptake for rapid growth and vibrant blooms.',
      },
    ],
  },
]

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug)

export const getVariantById = (
  product: Product,
  variantId: string
): PackVariant | undefined => product.variants.find((v) => v.id === variantId)

// ============================================================
// FORMAT HELPERS
// ============================================================
export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
