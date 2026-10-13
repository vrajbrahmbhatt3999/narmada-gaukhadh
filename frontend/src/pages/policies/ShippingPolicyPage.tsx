import { PolicyPage } from '@/components/ui/PolicyPage'

export function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping & Delivery Policy"
      subtitle="Information about how and when we deliver your orders."
      lastUpdated="[To be confirmed before launch]"
      disclaimer="All delivery timelines, charges, and geographic coverage must be confirmed with the business before publishing. Do not advertise specific timelines without verification."
      sections={[
        {
          heading: 'Delivery Coverage',
          body: '[PLACEHOLDER: Confirm which states and pincodes we deliver to before publishing.]',
        },
        {
          heading: 'Delivery Timelines',
          body: '[PLACEHOLDER: Confirm the expected delivery timeline — e.g., 3–7 business days within Gujarat, 7–14 days for other states. Do not publish without business confirmation.]',
        },
        {
          heading: 'Delivery Charges',
          body: '[PLACEHOLDER: Delivery charges must be confirmed by the business. A placeholder of ₹80 is currently shown for orders below ₹999. Confirm the actual policy, free-delivery threshold, and any weight-based charges before launch.]',
        },
        {
          heading: 'Courier Partners',
          body: '[PLACEHOLDER: Confirm which courier services are used for delivery before publishing.]',
        },
        {
          heading: 'Damaged or Lost Shipments',
          body: '[PLACEHOLDER: Policy for damaged or lost shipments must be confirmed by the business before publishing.]',
        },
        {
          heading: 'Bulk and Dealer Orders',
          body: 'For large or bulk orders, delivery terms are discussed and agreed separately. Please contact us for bulk order delivery information.',
        },
      ]}
    />
  )
}
