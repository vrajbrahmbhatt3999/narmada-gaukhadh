import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ShoppingBag, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react'
import { useCart } from '@/features/cart/CartContext'
import { formatPrice } from '@/config/products'
import { buildWhatsAppOrderUrl, openWhatsApp } from '@/lib/whatsapp'
import type { CheckoutFormData } from '@/types'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Lakshadweep', 'Puducherry', 'Jammu and Kashmir', 'Ladakh',
]

export function CheckoutPage() {
  const { cart, orderSummary, clearCart } = useCart()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [payuError, setPayuError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CheckoutFormData>({
    defaultValues: { state: 'Gujarat', paymentMethod: 'payu' },
  })

  if (cart.items.length === 0) {
    return (
      <div className="section">
        <div className="container flex flex-col items-center text-center py-16">
          <ShoppingBag size={48} style={{ color: 'var(--color-muted)', marginBottom: '1rem' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem' }}>
            Your cart is empty
          </h1>
          <Link to="/shop" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    )
  }

  const handleWhatsAppCheckout = () => {
    const data = getValues()
    const items = cart.items.map((item) => ({
      productName: item.productName,
      variantLabel: item.variantLabel,
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
      totalPrice: item.pricePerUnit * item.quantity,
      customerName: data.name,
      phone: data.phone,
      deliveryAddress: [data.addressLine1, data.addressLine2, data.city, data.state, data.pincode]
        .filter(Boolean)
        .join(', '),
    }))
    const url = buildWhatsAppOrderUrl(items)
    openWhatsApp(url)
  }

  const onSubmit = async (data: CheckoutFormData) => {
    if (data.paymentMethod === 'whatsapp') {
      handleWhatsAppCheckout()
      return
    }

    // PayU payment flow
    setSubmitting(true)
    setPayuError(null)
    try {
      const res = await fetch('/api/payments/payu/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          customer: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 ?? '',
            city: data.city,
            state: data.state,
            pincode: data.pincode,
          },
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Payment initiation failed.' }))
        throw new Error(err.message ?? 'Payment initiation failed.')
      }

      const { payuUrl, formData } = await res.json()

      // Submit the PayU form
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = payuUrl
      Object.entries(formData as Record<string, string>).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        form.appendChild(input)
      })
      document.body.appendChild(form)
      form.submit()
    } catch (err) {
      setPayuError(err instanceof Error ? err.message : 'Payment initiation failed. Please try WhatsApp ordering instead.')
      setSubmitting(false)
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '2rem' }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Customer details */}
              <div className="card">
                <div className="card-body">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                    Customer Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group sm:col-span-2">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        id="name"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Your full name"
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Mobile Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="10-digit mobile number"
                        {...register('phone', {
                          required: 'Mobile number is required',
                          pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian mobile number' },
                        })}
                      />
                      {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="your@email.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                        })}
                      />
                      {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery address */}
              <div className="card">
                <div className="card-body">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                    Delivery Address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group sm:col-span-2">
                      <label htmlFor="addressLine1" className="form-label">Address Line 1 *</label>
                      <input
                        id="addressLine1"
                        className={`form-input ${errors.addressLine1 ? 'error' : ''}`}
                        placeholder="House/Flat no., Building, Street"
                        {...register('addressLine1', { required: 'Address is required' })}
                      />
                      {errors.addressLine1 && <p className="form-error">{errors.addressLine1.message}</p>}
                    </div>

                    <div className="form-group sm:col-span-2">
                      <label htmlFor="addressLine2" className="form-label">Address Line 2 (Optional)</label>
                      <input
                        id="addressLine2"
                        className="form-input"
                        placeholder="Village, Area, Landmark"
                        {...register('addressLine2')}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="city" className="form-label">City / Town *</label>
                      <input
                        id="city"
                        className={`form-input ${errors.city ? 'error' : ''}`}
                        placeholder="City"
                        {...register('city', { required: 'City is required' })}
                      />
                      {errors.city && <p className="form-error">{errors.city.message}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="pincode" className="form-label">PIN Code *</label>
                      <input
                        id="pincode"
                        className={`form-input ${errors.pincode ? 'error' : ''}`}
                        placeholder="6-digit PIN code"
                        {...register('pincode', {
                          required: 'PIN code is required',
                          pattern: { value: /^\d{6}$/, message: 'Enter a valid 6-digit PIN code' },
                        })}
                      />
                      {errors.pincode && <p className="form-error">{errors.pincode.message}</p>}
                    </div>

                    <div className="form-group sm:col-span-2">
                      <label htmlFor="state" className="form-label">State *</label>
                      <select
                        id="state"
                        className={`form-input form-select ${errors.state ? 'error' : ''}`}
                        {...register('state', { required: 'State is required' })}
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <p className="form-error">{errors.state.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="card">
                <div className="card-body">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                    Payment Method
                  </h2>

                  <div className="flex flex-col gap-3">
                    {[
                      {
                        value: 'payu',
                        label: 'Pay Online (PayU)',
                        description: 'UPI, debit/credit card, net banking — via PayU secure gateway',
                        note: '⚠️ PayU payment requires backend configuration and sandbox credentials before it is active.',
                      },
                      {
                        value: 'whatsapp',
                        label: 'Order via WhatsApp',
                        description: 'Send your order details on WhatsApp — we will share payment instructions separately',
                        note: 'This is an enquiry, not an automated payment.',
                      },
                    ].map(({ value, label, description, note }) => (
                      <label
                        key={value}
                        className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all"
                        style={{
                          border: '1.5px solid var(--color-border)',
                          background: 'white',
                        }}
                      >
                        <input
                          type="radio"
                          value={value}
                          className="mt-1"
                          {...register('paymentMethod')}
                          style={{ accentColor: 'var(--color-forest)', width: '1rem', height: '1rem', flexShrink: 0 }}
                        />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{label}</p>
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{description}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-earth)', marginTop: '0.25rem', fontStyle: 'italic' }}>{note}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* PayU error */}
              {payuError && (
                <div
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(192,57,43,0.07)', border: '1px solid rgba(192,57,43,0.2)', color: 'var(--color-error)' }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ fontSize: '0.875rem' }}>{payuError}</p>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="lg:col-span-1">
              <div className="card" style={{ position: 'sticky', top: '5rem' }}>
                <div className="card-body">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem' }}>
                    Your Order
                  </h2>

                  <div className="flex flex-col gap-3 mb-4">
                    {cart.items.map((item) => (
                      <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                        <div style={{ color: 'var(--color-dark)' }}>
                          <p style={{ fontWeight: 500 }}>{item.productName}</p>
                          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
                            {item.variantLabel} × {item.quantity}
                          </p>
                        </div>
                        <span style={{ fontWeight: 600 }}>
                          {formatPrice(item.pricePerUnit * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="divider" />

                  <div className="flex flex-col gap-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-muted)' }}>Subtotal</span>
                      <span>{formatPrice(orderSummary.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--color-muted)' }}>Delivery</span>
                      <span style={{ color: orderSummary.deliveryCharge === 0 ? 'var(--color-success)' : undefined }}>
                        {orderSummary.deliveryCharge === 0 ? 'Free' : formatPrice(orderSummary.deliveryCharge)}
                      </span>
                    </div>
                  </div>

                  <div className="divider" />

                  <div className="flex justify-between mb-4">
                    <span style={{ fontWeight: 700 }}>Total</span>
                    <span className="price-display price-display-sm">{formatPrice(orderSummary.total)}</span>
                  </div>

                  <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>
                    *Prices are placeholder values. All amounts, delivery charges, and taxes must be confirmed before launch.
                  </p>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={submitting}
                  >
                    {submitting ? 'Processing…' : 'Place Order'}
                    {!submitting && <ArrowRight size={16} />}
                  </button>

                  <div className="text-center mt-3">
                    <Link to="/cart" style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }} className="hover:text-forest transition-colors">
                      ← Back to cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
