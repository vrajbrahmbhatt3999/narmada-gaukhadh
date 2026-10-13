import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { SITE_CONFIG, PRODUCTS } from '@/config/products'
import { buildWhatsAppEnquiryUrl, openWhatsApp } from '@/lib/whatsapp'

interface BulkEnquiryForm {
  name: string
  phone: string
  product: string
  quantity: string
  message: string
}

export function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<BulkEnquiryForm>()

  const onSubmit = async (data: BulkEnquiryForm) => {
    setSubmitStatus('sending')
    try {
      // Try backend endpoint first; fall back to WhatsApp
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        throw new Error('Backend unavailable')
      }
    } catch {
      // Backend not configured — fall back to WhatsApp
      const url = buildWhatsAppEnquiryUrl(data)
      openWhatsApp(url)
      setSubmitStatus('success')
      reset()
    }
  }

  const handleManualWhatsApp = () => {
    const data = getValues()
    const url = buildWhatsAppEnquiryUrl({
      name: data.name || '[Name not provided]',
      phone: data.phone || '[Phone not provided]',
      product: data.product || '[Product not selected]',
      quantity: data.quantity || '[Quantity not specified]',
      message: data.message || '[No message]',
    })
    openWhatsApp(url)
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-forest-dark) 0%, var(--color-forest) 100%)',
          padding: '4rem 0 3rem',
        }}
      >
        <div className="container text-center">
          <p className="section-tag" style={{ color: 'rgba(168,213,162,0.9)', justifyContent: 'center' }}>Contact</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '0.75rem' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto' }}>
            For product enquiries, bulk orders, or any questions — we're here to help.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                Contact Details
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Reach us through any of the following channels.
              </p>

              {[
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: SITE_CONFIG.whatsappNumber ? `+${SITE_CONFIG.whatsappNumber}` : '[Not configured — add VITE_WHATSAPP_NUMBER to config]',
                  href: SITE_CONFIG.whatsappNumber ? `https://wa.me/${SITE_CONFIG.whatsappNumber}` : undefined,
                  color: '#25D366',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: SITE_CONFIG.phone || '[Phone not configured]',
                  href: SITE_CONFIG.phone ? `tel:${SITE_CONFIG.phone}` : undefined,
                  color: 'var(--color-forest)',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: SITE_CONFIG.email || '[Email not configured]',
                  href: SITE_CONFIG.email ? `mailto:${SITE_CONFIG.email}` : undefined,
                  color: 'var(--color-earth)',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: SITE_CONFIG.address
                    ? `${SITE_CONFIG.address}, ${SITE_CONFIG.city}, ${SITE_CONFIG.state}`
                    : `${SITE_CONFIG.state}, ${SITE_CONFIG.country}`,
                  href: undefined,
                  color: 'var(--color-leaf)',
                },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        style={{ fontSize: '0.875rem', color: 'var(--color-dark)', fontWeight: 500 }}
                        className="hover:text-forest transition-colors">
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.875rem', color: value.startsWith('[') ? 'var(--color-muted)' : 'var(--color-dark)', fontStyle: value.startsWith('[') ? 'italic' : 'normal' }}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk enquiry form */}
            <div className="lg:col-span-2" id="bulk">
              <div className="card">
                <div className="card-body">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Bulk & Dealer Enquiry
                  </h2>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Fill in your details and we'll get back to you with pricing and availability for bulk orders.
                  </p>

                  {submitStatus === 'success' ? (
                    <div
                      className="flex flex-col items-center justify-center py-10 text-center gap-4"
                    >
                      <CheckCircle size={48} style={{ color: 'var(--color-success)' }} />
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem' }}>
                        Enquiry Sent!
                      </h3>
                      <p style={{ color: 'var(--color-muted)', maxWidth: '320px', fontSize: '0.9rem' }}>
                        Your enquiry has been sent. We'll contact you shortly on the number you provided.
                      </p>
                      <button className="btn btn-secondary" onClick={() => setSubmitStatus('idle')}>
                        Send Another Enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="form-group">
                          <label htmlFor="enq-name" className="form-label">Your Name *</label>
                          <input
                            id="enq-name"
                            className={`form-input ${errors.name ? 'error' : ''}`}
                            placeholder="Full name"
                            {...register('name', { required: 'Name is required' })}
                          />
                          {errors.name && <p className="form-error">{errors.name.message}</p>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="enq-phone" className="form-label">Mobile Number *</label>
                          <input
                            id="enq-phone"
                            type="tel"
                            className={`form-input ${errors.phone ? 'error' : ''}`}
                            placeholder="10-digit mobile"
                            {...register('phone', {
                              required: 'Mobile number is required',
                              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid Indian mobile number' },
                            })}
                          />
                          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="enq-product" className="form-label">Product of Interest *</label>
                          <select
                            id="enq-product"
                            className={`form-input form-select ${errors.product ? 'error' : ''}`}
                            {...register('product', { required: 'Please select a product' })}
                          >
                            <option value="">Select a product…</option>
                            {PRODUCTS.map((p) => (
                              <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                            <option value="Both Products">Both Products</option>
                          </select>
                          {errors.product && <p className="form-error">{errors.product.message}</p>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="enq-quantity" className="form-label">Approximate Quantity *</label>
                          <input
                            id="enq-quantity"
                            className={`form-input ${errors.quantity ? 'error' : ''}`}
                            placeholder="e.g. 100 kg, 50 litres"
                            {...register('quantity', { required: 'Quantity is required' })}
                          />
                          {errors.quantity && <p className="form-error">{errors.quantity.message}</p>}
                        </div>

                        <div className="form-group sm:col-span-2">
                          <label htmlFor="enq-message" className="form-label">Message</label>
                          <textarea
                            id="enq-message"
                            className="form-input"
                            rows={4}
                            placeholder="Tell us about your requirements, location, frequency, etc."
                            {...register('message')}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button type="submit" className="btn btn-primary flex-1" disabled={submitStatus === 'sending'}>
                          <Send size={16} />
                          {submitStatus === 'sending' ? 'Sending…' : 'Send Enquiry'}
                        </button>
                        <button type="button" className="btn btn-whatsapp flex-1" onClick={handleManualWhatsApp}>
                          <MessageCircle size={16} />
                          Send on WhatsApp
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
