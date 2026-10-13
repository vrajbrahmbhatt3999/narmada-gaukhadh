import { PolicyPage } from '@/components/ui/PolicyPage'

export function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      subtitle="Please read these terms before using our website or placing an order."
      lastUpdated="[To be confirmed before launch]"
      disclaimer="This is a template. All terms must be reviewed and approved by qualified legal counsel before publishing for real customers."
      sections={[
        {
          heading: '1. Acceptance of Terms',
          body: 'By accessing our website and placing an order, you agree to these Terms and Conditions. If you do not agree, please do not use the website.',
        },
        {
          heading: '2. Products and Prices',
          body: 'All products are sold subject to availability. Prices displayed on the website are indicative and may change without notice. The price applicable to your order will be confirmed at the time of order placement.\n\n[PLACEHOLDER: Confirm the pricing policy, GST applicability, and whether prices are inclusive or exclusive of tax before launch.]',
        },
        {
          heading: '3. Orders and Payment',
          body: 'Orders placed through the website are subject to acceptance. We reserve the right to refuse or cancel any order.\n\nPayment is processed through PayU, a third-party gateway. A WhatsApp order constitutes an enquiry only and is not a confirmed paid order.\n\n[PLACEHOLDER: Confirm the exact order acceptance and cancellation terms with the business before publishing.]',
        },
        {
          heading: '4. Delivery',
          body: '[PLACEHOLDER: Delivery terms, geographic restrictions, timelines, and charges must be confirmed by the business before publishing. Do not commit to specific delivery times without verification.]',
        },
        {
          heading: '5. Product Use',
          body: 'Our products are agricultural soil amendments and liquid preparations intended for agricultural use only. Users are responsible for following usage instructions as provided by the business. We do not guarantee specific yield improvements or agricultural outcomes.',
        },
        {
          heading: '6. Limitation of Liability',
          body: '[PLACEHOLDER: Limitation of liability and disclaimers must be drafted by legal counsel in accordance with Indian consumer protection laws before publishing.]',
        },
        {
          heading: '7. Governing Law',
          body: '[PLACEHOLDER: Specify governing jurisdiction — typically Gujarat, India — after legal review.]',
        },
      ]}
    />
  )
}
