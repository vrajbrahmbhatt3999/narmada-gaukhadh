import { motion } from 'framer-motion'
import { Leaf, Sun, Heart } from 'lucide-react'

export function MissionSection() {
  return (
    <section
      className="section"
      style={{
        background: 'linear-gradient(135deg, var(--color-forest-dark) 0%, var(--color-forest) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Brand mission"
    >
      {/* Subtle pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(86,131,77,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(138,98,70,0.2) 0%, transparent 40%)`,
        }}
      />

      <div className="container relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-12">
          <p className="section-tag" style={{ color: 'rgba(168,213,162,0.9)', justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', width: '1.5rem', height: '2px', background: 'rgba(168,213,162,0.6)', borderRadius: '2px' }} />
            Our Purpose
          </p>
          <h2 className="section-title" style={{ color: 'white' }}>
            Mission, Vision & Values
          </h2>
          <p className="section-subtitle mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            [The following content is editable placeholder — replace with the actual business mission and vision provided by the founders before publishing.]
          </p>
        </div>

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Leaf,
              title: 'Our Mission',
              body: '[PLACEHOLDER: Describe the business mission — e.g., to provide natural, cow-based agricultural products that support sustainable Indian farming. Replace with the verified mission statement from the founders.]',
            },
            {
              icon: Sun,
              title: 'Our Vision',
              body: '[PLACEHOLDER: Describe the long-term vision — e.g., supporting a return to traditional Panchagavya farming across Gujarat and beyond. Replace with the verified vision from the founders.]',
            },
            {
              icon: Heart,
              title: 'Our Values',
              body: '[PLACEHOLDER: List core values such as natural inputs, farmer well-being, environmental responsibility, and transparency. Replace with values confirmed by the business.]',
            },
          ].map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '1.25rem',
                padding: '2rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                style={{ background: 'rgba(168,213,162,0.15)' }}
              >
                <Icon size={22} style={{ color: '#A8D5A2' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'white', marginBottom: '0.75rem' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontStyle: 'italic' }}>
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
