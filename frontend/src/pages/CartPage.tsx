import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react'
import { useCart } from '@/features/cart/CartContext'
import { PRODUCTS, getProductBySlug, getVariantById, formatPrice } from '@/config/products'
import { buildWhatsAppOrderUrl, openWhatsApp } from '@/lib/whatsapp'

export function CartPage() {
  const { cart, removeItem, updateQuantity, updateVariant, orderSummary } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="section">
        <div className="container flex flex-col items-center justify-center text-center py-16">
          <div
            className="flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ background: 'rgba(33,78,52,0.07)' }}
          >
            <ShoppingBag size={36} style={{ color: 'var(--color-forest)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem' }}>
            Your cart is empty
          </h1>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', maxWidth: '360px' }}>
            Explore our natural agricultural products and add them to your cart.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Browse Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  const handleWhatsAppOrder = () => {
    const items = cart.items.map((item) => ({
      productName: item.productName,
      variantLabel: item.variantLabel,
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
      totalPrice: item.pricePerUnit * item.quantity,
    }))
    const url = buildWhatsAppOrderUrl(items)
    openWhatsApp(url)
  }

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '2rem' }}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.items.map((item) => {
              const product = getProductBySlug(item.productId) ?? PRODUCTS[0]

              return (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="card"
                  style={{ overflow: 'visible' }}
                >
                  <div className="card-body">
                    <div className="flex gap-4">
                      {/* Product thumbnail */}
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          flexShrink: 0,
                          borderRadius: '0.75rem',
                          background: `linear-gradient(135deg, ${product.category === 'solid' ? '#8A6246, #56834D' : '#214E34, #56834D'})`,
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                          {item.productName}
                        </h3>

                        {/* Variant selector */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              className={`pack-option ${item.variantId === v.id ? 'selected' : ''}`}
                              style={{ padding: '0.25rem 0.625rem', fontSize: '0.75rem' }}
                              onClick={() =>
                                updateVariant(
                                  item.productId,
                                  item.variantId,
                                  v.id,
                                  v.label,
                                  v.priceInr,
                                  v.sku
                                )
                              }
                            >
                              {v.label} — {formatPrice(v.priceInr)}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-3">
                          {/* Quantity */}
                          <div className="qty-selector" style={{ height: '2rem' }}>
                            <button
                              className="qty-btn"
                              style={{ width: '2rem', height: '2rem' }}
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="qty-value" style={{ minWidth: '2rem', fontSize: '0.875rem' }}>
                              {item.quantity}
                            </span>
                            <button
                              className="qty-btn"
                              style={{ width: '2rem', height: '2rem' }}
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span style={{ fontWeight: 700, color: 'var(--color-forest)', fontSize: '1.0625rem' }}>
                              {formatPrice(item.pricePerUnit * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.productId, item.variantId)}
                              className="btn btn-icon btn-sm"
                              style={{ border: '1px solid rgba(192,57,43,0.2)', color: 'var(--color-error)', background: 'rgba(192,57,43,0.05)' }}
                              aria-label={`Remove ${item.productName} from cart`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="card" style={{ position: 'sticky', top: '5rem' }}>
              <div className="card-body">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                  Order Summary
                </h2>

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-muted)' }}>Subtotal</span>
                    <span style={{ fontWeight: 500 }}>{formatPrice(orderSummary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-muted)' }}>Delivery</span>
                    <span style={{ fontWeight: 500, color: orderSummary.deliveryCharge === 0 ? 'var(--color-success)' : 'var(--color-dark)' }}>
                      {orderSummary.deliveryCharge === 0 ? 'Free' : formatPrice(orderSummary.deliveryCharge)}
                    </span>
                  </div>
                </div>

                <div className="divider" />

                <div className="flex justify-between mb-5">
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>Total</span>
                  <span className="price-display price-display-sm">{formatPrice(orderSummary.total)}</span>
                </div>

                <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>
                  *Prices are placeholder values. Actual prices, delivery charges, and taxes must be confirmed before launch.
                </p>

                <div className="flex flex-col gap-2">
                  <Link to="/checkout" className="btn btn-primary w-full">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </Link>
                  <button className="btn btn-whatsapp w-full" onClick={handleWhatsAppOrder}>
                    <MessageCircle size={16} />
                    Order via WhatsApp
                  </button>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
                  WhatsApp orders are enquiries, not confirmed paid orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
