import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/features/cart/CartContext'
import { RootLayout } from '@/components/layout/RootLayout'

// Pages
import { HomePage } from '@/pages/HomePage'
import { ShopPage } from '@/pages/ShopPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { PrivacyPolicyPage } from '@/pages/policies/PrivacyPolicyPage'
import { TermsPage } from '@/pages/policies/TermsPage'
import { ShippingPolicyPage } from '@/pages/policies/ShippingPolicyPage'
import { CancellationPolicyPage } from '@/pages/policies/CancellationPolicyPage'
import { PaymentSuccessPage } from '@/pages/payments/PaymentSuccessPage'
import { PaymentFailedPage } from '@/pages/payments/PaymentFailedPage'
import { PaymentPendingPage } from '@/pages/payments/PaymentPendingPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/policies/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/policies/terms" element={<TermsPage />} />
            <Route path="/policies/shipping" element={<ShippingPolicyPage />} />
            <Route path="/policies/cancellation" element={<CancellationPolicyPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/failed" element={<PaymentFailedPage />} />
            <Route path="/payment/pending" element={<PaymentPendingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
