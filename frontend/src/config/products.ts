// ============================================================
// CENTRAL PRODUCT & BUSINESS CONFIGURATION
// Update this file before launch — do NOT duplicate data elsewhere
// ============================================================

export const SITE_CONFIG = {
  brandName: 'Narmada Gaukhadh',
  brandNameGujarati: 'નર્મદા ગૌખાધ',
  tagline: 'Pure Soil. Healthy Crops. Natural Farming.',
  description:
    'Premium natural agricultural products made using traditional cow-based farming practices.',
  /** @todo Confirm and set final WhatsApp business number before launch (include country code, no +) */
  whatsappNumber: '', // e.g. '919876543210'
  /** @todo Set confirmed phone number */
  phone: '',
  /** @todo Set confirmed email */
  email: '',
  /** @todo Set confirmed business address */
  address: '',
  /** @todo Set confirmed city/state */
  city: '',
  state: 'Gujarat',
  country: 'India',
  /** Production domain — update before launch for canonical URLs and OG tags */
  siteUrl: 'https://narmadagaukhadh.com',
  /** @todo Confirm social handles */
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
  },
  /** Announcement bar — set to empty string to hide */
  announcement:
    '🌿 Natural farming products delivered across India — Order on WhatsApp',
  /** @todo Confirm actual delivery charges policy before launch */
  freeDeliveryAbove: 999, // ₹ order value for free delivery (placeholder)
  defaultDeliveryCharge: 80, // ₹ placeholder — confirm with business
}

// ============================================================
// PRODUCT CATALOG
// All prices are PLACEHOLDER — confirm before accepting real orders
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
  /** Images: use real product photos. Placeholders listed as '' */
  images: string[]
  variants: PackVariant[]
  usageNote: string
  /** @todo All details below must be verified by the business before publishing */
  ingredients: string // leave empty if unverified
  storageInstructions: string
  faqs: { question: string; answer: string }[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'vermicompost',
    slug: 'vermicompost',
    name: 'Narmada Gaukhadh Vermicompost',
    nameGujarati: 'અળસિયું ખાતર',
    shortDescription:
      'Premium organic vermicompost made with cow dung and traditional Panchagavya inputs for healthier soil and stronger crops.',
    longDescription:
      'Narmada Gaukhadh Vermicompost is produced using a natural composting process that incorporates cow dung and Panchagavya-based ingredients. Designed to enrich soil structure and support sustainable farming practices.\n\n[PLACEHOLDER: Please provide the full production process, certified ingredients, application rates, and any laboratory test results before publishing.]',
    category: 'solid',
    images: [], // placeholder — add real product images
    variants: [
      { id: 'vc-1kg', label: '1 kg', priceInr: 99, weightOrVolume: '1 kg', sku: 'NG-VC-1KG' },
      { id: 'vc-5kg', label: '5 kg', priceInr: 349, weightOrVolume: '5 kg', sku: 'NG-VC-5KG' },
      { id: 'vc-25kg', label: '25 kg', priceInr: 999, weightOrVolume: '25 kg', sku: 'NG-VC-25KG' },
    ],
    /** @todo Verify with business before publishing */
    usageNote:
      'Application rate and method must be confirmed with the business before publishing.',
    ingredients: '', // placeholder — do not invent
    storageInstructions:
      'Store in a cool, dry place away from direct sunlight. [Verify with business]',
    faqs: [
      {
        question: 'What is vermicompost?',
        answer:
          'Vermicompost is an organic fertilizer produced by earthworms processing organic matter. It improves soil structure and microbial activity.',
      },
      {
        question: 'How is Narmada Gaukhadh Vermicompost made?',
        answer:
          '[PLACEHOLDER: The business will provide a verified description of their production process.]',
      },
      {
        question: 'How do I apply it?',
        answer:
          '[PLACEHOLDER: Application instructions to be confirmed by the business before launch.]',
      },
    ],
  },
  {
    id: 'vidhyanchal',
    slug: 'vidhyanchal',
    name: 'Vidhyanchal',
    nameGujarati: 'વિધ્યાંચળ',
    shortDescription:
      'A natural liquid agricultural product for sustainable crop care. Details to be confirmed with the business.',
    longDescription:
      'Vidhyanchal is a liquid-based agricultural product offered by Narmada Gaukhadh.\n\n[PLACEHOLDER: Composition, crop suitability, dosage, application method, benefits, and safety information must all be confirmed and verified by the business before publishing.]',
    category: 'liquid',
    images: [], // placeholder — add real product images
    variants: [
      { id: 'vy-500ml', label: '500 ml', priceInr: 149, weightOrVolume: '500 ml', sku: 'NG-VY-500ML' },
      { id: 'vy-1l', label: '1 litre', priceInr: 249, weightOrVolume: '1 litre', sku: 'NG-VY-1L' },
      { id: 'vy-5l', label: '5 litres', priceInr: 799, weightOrVolume: '5 litres', sku: 'NG-VY-5L' },
      { id: 'vy-20l', label: '20 litres', priceInr: 2499, weightOrVolume: '20 litres', sku: 'NG-VY-20L' },
    ],
    /** @todo Verify with business before publishing */
    usageNote:
      'Application rate, dilution ratio, and compatible crops must be confirmed with the business before publishing.',
    ingredients: '', // placeholder — do not invent
    storageInstructions:
      'Store in a cool, dry place. Keep away from direct sunlight. [Verify with business]',
    faqs: [
      {
        question: 'What is Vidhyanchal used for?',
        answer:
          '[PLACEHOLDER: Crop suitability and benefits to be confirmed by the business before launch.]',
      },
      {
        question: 'How do I apply Vidhyanchal?',
        answer:
          '[PLACEHOLDER: Application instructions to be confirmed by the business before launch.]',
      },
      {
        question: 'Is it safe for all crops?',
        answer:
          '[PLACEHOLDER: Crop compatibility to be confirmed by the business before launch.]',
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
