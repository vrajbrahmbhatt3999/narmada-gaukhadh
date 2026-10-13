// Central product catalog — AUTHORITATIVE server-side source of prices
// All checkout and payment amounts MUST be calculated from this file, never from client data

export interface PackVariant {
  id: string
  label: string
  priceInPaise: number // 1 INR = 100 paise — PLACEHOLDER — confirm before launch
  sku: string
}

export interface Product {
  id: string
  slug: string
  name: string
  variants: PackVariant[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'vermicompost',
    slug: 'vermicompost',
    name: 'Narmada Gaukhadh Vermicompost',
    variants: [
      { id: 'vc-1kg',  label: '1 kg',  priceInPaise: 9900,   sku: 'NG-VC-1KG' },
      { id: 'vc-5kg',  label: '5 kg',  priceInPaise: 34900,  sku: 'NG-VC-5KG' },
      { id: 'vc-25kg', label: '25 kg', priceInPaise: 99900,  sku: 'NG-VC-25KG' },
    ],
  },
  {
    id: 'vidhyanchal',
    slug: 'vidhyanchal',
    name: 'Vidhyanchal',
    variants: [
      { id: 'vy-500ml', label: '500 ml',   priceInPaise: 14900,  sku: 'NG-VY-500ML' },
      { id: 'vy-1l',    label: '1 litre',  priceInPaise: 24900,  sku: 'NG-VY-1L' },
      { id: 'vy-5l',    label: '5 litres', priceInPaise: 79900,  sku: 'NG-VY-5L' },
      { id: 'vy-20l',   label: '20 litres',priceInPaise: 249900, sku: 'NG-VY-20L' },
    ],
  },
]

export const FREE_DELIVERY_ABOVE_PAISE = 99900 // ₹999 — PLACEHOLDER
export const DEFAULT_DELIVERY_CHARGE_PAISE = 8000 // ₹80 — PLACEHOLDER

export const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id)
export const getVariant = (product: Product, variantId: string) =>
  product.variants.find((v) => v.id === variantId)

export interface OrderLineInput {
  productId: string
  variantId: string
  quantity: number
}

export interface ValidatedOrderLine {
  productId: string
  productName: string
  variantId: string
  variantLabel: string
  sku: string
  quantity: number
  unitPriceInPaise: number
  lineTotalInPaise: number
}

export interface OrderCalculation {
  lines: ValidatedOrderLine[]
  subtotalInPaise: number
  deliveryChargeInPaise: number
  totalInPaise: number
}

export function calculateOrder(inputs: OrderLineInput[]): OrderCalculation | null {
  if (!inputs.length) return null

  const lines: ValidatedOrderLine[] = []

  for (const input of inputs) {
    const product = getProductById(input.productId)
    if (!product) return null

    const variant = getVariant(product, input.variantId)
    if (!variant) return null

    if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 999) {
      return null
    }

    lines.push({
      productId: product.id,
      productName: product.name,
      variantId: variant.id,
      variantLabel: variant.label,
      sku: variant.sku,
      quantity: input.quantity,
      unitPriceInPaise: variant.priceInPaise,
      lineTotalInPaise: variant.priceInPaise * input.quantity,
    })
  }

  const subtotalInPaise = lines.reduce((s, l) => s + l.lineTotalInPaise, 0)
  const deliveryChargeInPaise =
    subtotalInPaise >= FREE_DELIVERY_ABOVE_PAISE ? 0 : DEFAULT_DELIVERY_CHARGE_PAISE
  const totalInPaise = subtotalInPaise + deliveryChargeInPaise

  return { lines, subtotalInPaise, deliveryChargeInPaise, totalInPaise }
}
