import { PolicyPage } from '@/components/ui/PolicyPage'

export function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      lastUpdated="[To be confirmed before launch]"
      disclaimer="This is a template. All terms, timelines, and legal statements must be reviewed and approved by qualified legal counsel before publishing for real customers."
      sections={[
        {
          heading: '1. Information We Collect',
          body: 'When you place an order or contact us, we collect information such as your name, mobile number, email address, and delivery address.\n\nWe may also collect information you provide when using our enquiry form or WhatsApp messaging.',
        },
        {
          heading: '2. How We Use Your Information',
          body: 'We use your information to process and deliver your orders, respond to your enquiries, and contact you regarding your order status.\n\nWe do not sell, share, or rent your personal information to third parties except as required to process your payment (via PayU) or deliver your order.',
        },
        {
          heading: '3. Payment Information',
          body: 'Payments are processed securely through PayU, a third-party payment gateway. We do not store your card numbers, CVV, or banking credentials on our servers.\n\n[PLACEHOLDER: Confirm the exact payment data handling policy with PayU documentation and legal counsel before publishing.]',
        },
        {
          heading: '4. Data Retention',
          body: '[PLACEHOLDER: Confirm how long customer data is retained, in accordance with applicable Indian data protection laws and GST requirements, before publishing.]',
        },
        {
          heading: '5. Your Rights',
          body: '[PLACEHOLDER: Describe customer rights regarding access, correction, and deletion of their data, in compliance with applicable Indian laws before publishing.]',
        },
        {
          heading: '6. Contact',
          body: 'For privacy-related queries, please contact us using the details on our Contact page.',
        },
      ]}
    />
  )
}
