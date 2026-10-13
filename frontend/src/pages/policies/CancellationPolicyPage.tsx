import { PolicyPage } from '@/components/ui/PolicyPage'

export function CancellationPolicyPage() {
  return (
    <PolicyPage
      title="Cancellation & Refund Policy"
      subtitle="Our policy on order cancellations, returns, and refunds."
      lastUpdated="[To be confirmed before launch]"
      disclaimer="All cancellation periods, refund timelines, and return conditions must be confirmed by the business and reviewed by legal counsel before publishing. Do not commit to specific terms without business verification."
      sections={[
        {
          heading: 'Order Cancellation',
          body: '[PLACEHOLDER: Confirm the cancellation window — e.g., orders can be cancelled within X hours of placement before dispatch. Confirm with business before publishing.]',
        },
        {
          heading: 'Returns',
          body: 'Due to the nature of agricultural products, returns may be subject to specific conditions.\n\n[PLACEHOLDER: Return eligibility, condition of returned goods, and process must be confirmed by the business before publishing.]',
        },
        {
          heading: 'Refund Process',
          body: '[PLACEHOLDER: Refund timeline and process — e.g., refunds processed within X business days to the original payment method — must be confirmed by the business before publishing. Do not advertise a specific timeline without confirmation.]',
        },
        {
          heading: 'Damaged or Incorrect Products',
          body: '[PLACEHOLDER: Policy for damaged or incorrect products received must be confirmed by the business before publishing. Typically requires photographic evidence within a specified period of delivery.]',
        },
        {
          heading: 'Non-Refundable Cases',
          body: '[PLACEHOLDER: List conditions under which refunds will not be issued — e.g., products used or opened, damage caused by customer, or orders placed during sale. Confirm with business and legal counsel before publishing.]',
        },
        {
          heading: 'Contact for Refunds',
          body: 'To initiate a cancellation or refund, please contact us via WhatsApp or email as listed on our Contact page. Include your order number and details.',
        },
      ]}
    />
  )
}
