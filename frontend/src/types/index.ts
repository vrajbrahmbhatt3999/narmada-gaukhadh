// Shared TypeScript types

export interface CartItem {
  productId: string
  productName: string
  variantId: string
  variantLabel: string
  sku: string
  quantity: number
  pricePerUnit: number
}

export interface CartState {
  items: CartItem[]
}

export interface CheckoutFormData {
  name: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  paymentMethod: 'payu' | 'whatsapp'
}

export interface OrderSummary {
  subtotal: number
  deliveryCharge: number
  total: number
}

export interface ApiProduct {
  id: string
  slug: string
  name: string
  nameGujarati: string
  shortDescription: string
  variants: {
    id: string
    label: string
    priceInr: number
    sku: string
  }[]
}

export interface ApiOrderRequest {
  items: {
    productId: string
    variantId: string
    quantity: number
  }[]
  customer: {
    name: string
    email: string
    phone: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    pincode: string
  }
}

export interface ApiOrderResponse {
  orderId: string
  orderRef: string
  status: string
  totalAmount: number
}

export interface PayUInitiateResponse {
  payuUrl: string
  formData: Record<string, string>
}
