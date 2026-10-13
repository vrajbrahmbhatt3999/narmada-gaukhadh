// Reusable policy page layout component

interface PolicySection {
  heading: string
  body: string
}

interface PolicyPageProps {
  title: string
  subtitle: string
  lastUpdated?: string
  sections: PolicySection[]
  disclaimer?: string
}

export function PolicyPage({ title, subtitle, lastUpdated, sections, disclaimer }: PolicyPageProps) {
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
          <p className="section-tag" style={{ color: 'rgba(168,213,162,0.9)', justifyContent: 'center' }}>Legal</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'white', marginBottom: '0.75rem' }}>
            {title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto' }}>
            {subtitle}
          </p>
          {lastUpdated && (
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.75rem' }}>
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>

      <div className="section">
        <div className="container max-w-3xl">
          {disclaimer && (
            <div
              className="p-4 rounded-xl mb-8 text-sm"
              style={{ background: 'rgba(33,78,52,0.06)', border: '1px solid rgba(33,78,52,0.15)', color: 'var(--color-forest)', fontStyle: 'italic' }}
            >
              ⚠️ {disclaimer}
            </div>
          )}

          <div className="flex flex-col gap-8">
            {sections.map(({ heading, body }) => (
              <section key={heading} aria-label={heading}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-dark)' }}>
                  {heading}
                </h2>
                {body.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '0.75rem', fontStyle: para.startsWith('[') ? 'italic' : 'normal' }}>
                    {para}
                  </p>
                ))}
                <div className="divider" />
              </section>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-cream-dark)', borderRadius: '0.875rem', fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
            <strong>Contact us:</strong> For any questions about this policy, please reach out via WhatsApp or email as configured on our Contact page. Business address and contact details are subject to confirmation.
          </div>
        </div>
      </div>
    </div>
  )
}
