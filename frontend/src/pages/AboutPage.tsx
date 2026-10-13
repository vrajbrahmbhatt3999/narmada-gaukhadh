import { motion } from 'framer-motion'
import { Leaf, Sprout, Heart, Users } from 'lucide-react'

export function AboutPage() {
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
          <p className="section-tag" style={{ color: 'rgba(168,213,162,0.9)', justifyContent: 'center' }}>About Us</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '0.75rem' }}>
            Narmada Gaukhadh
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>
            Natural agricultural products rooted in traditional Panchagavya farming practices.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="section">
        <div className="container max-w-3xl">
          <div
            className="p-5 rounded-xl mb-8"
            style={{ background: 'rgba(33,78,52,0.06)', border: '1px solid rgba(33,78,52,0.15)', fontStyle: 'italic', color: 'var(--color-forest)', fontSize: '0.9rem' }}
          >
            ⚠️ The content below is placeholder text. All business history, team information, production details, and credentials must be provided and verified by the business before publishing. Do not invent or publish unverified facts.
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1rem' }}>
              Our Story
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
              [PLACEHOLDER: Provide the authentic business introduction — who founded the business, where, and why. Do not invent a story.]
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
              [PLACEHOLDER: Describe the motivation behind creating natural, Panchagavya-based products — based on facts confirmed by the founders.]
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission / Vision / Values */}
      <div className="section" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Mission',
                body: '[PLACEHOLDER: Business mission — to be confirmed by the founders before publication.]',
              },
              {
                icon: Sprout,
                title: 'Vision',
                body: '[PLACEHOLDER: Business vision — to be confirmed by the founders before publication.]',
              },
              {
                icon: Heart,
                title: 'Values',
                body: '[PLACEHOLDER: Core values — to be confirmed by the founders before publication.]',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="p-6 rounded-2xl"
                style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ background: 'rgba(33,78,52,0.08)', color: 'var(--color-forest)' }}
                >
                  <Icon size={22} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Production process */}
      <div className="section">
        <div className="container max-w-3xl">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1rem' }}>
            Our Production Approach
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '1rem', fontStyle: 'italic' }}>
            [PLACEHOLDER: Describe the production approach, facilities, and quality process. All details must be confirmed by the business before publishing.]
          </p>
          <div
            className="p-4 rounded-xl text-sm"
            style={{ background: 'rgba(33,78,52,0.06)', border: '1px solid rgba(33,78,52,0.15)', color: 'var(--color-forest)' }}
          >
            Our vermicompost is made using a process that incorporates cow dung and traditional Panchagavya inputs. Full production details and any certifications must be verified and confirmed by the business before being published here.
          </div>
        </div>
      </div>

      {/* Team placeholder */}
      <div className="section" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="container max-w-3xl text-center">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4"
            style={{ background: 'rgba(33,78,52,0.08)', color: 'var(--color-forest)' }}
          >
            <Users size={30} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            Our Team
          </h2>
          <p style={{ color: 'var(--color-muted)', fontStyle: 'italic', fontSize: '0.9375rem' }}>
            [PLACEHOLDER: Add team member names, roles, and photographs as provided and confirmed by the business. Do not invent team information.]
          </p>
        </div>
      </div>
    </div>
  )
}
