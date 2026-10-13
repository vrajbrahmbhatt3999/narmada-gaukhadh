import { motion, type Variants } from 'framer-motion'
import { Recycle, Leaf, Sprout, FlaskConical } from 'lucide-react'

const steps = [
  {
    icon: Recycle,
    step: '01',
    title: 'Cow Dung Collection',
    description:
      'Fresh cow dung from local cows is collected and prepared as the primary organic base material. [Confirm process with business]',
  },
  {
    icon: FlaskConical,
    step: '02',
    title: 'Panchagavya Enrichment',
    description:
      'Traditional Panchagavya inputs — including cow milk, curd, ghee, and cow urine — are incorporated into the composting process. [Confirm formulation with business]',
  },
  {
    icon: Leaf,
    step: '03',
    title: 'Natural Composting',
    description:
      'The mixture undergoes a controlled vermicomposting process under natural conditions for an extended curing period. [Confirm duration with business]',
  },
  {
    icon: Sprout,
    step: '04',
    title: 'Quality & Packaging',
    description:
      'The finished compost is reviewed for quality and packed in available sizes for distribution to farmers. [Confirm testing process with business]',
  },
]

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export function ProcessSection() {
  return (
    <section
      className="section"
      aria-label="Production process"
      style={{ background: 'white' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <p className="section-tag">
              <span style={{ display: 'inline-block', width: '1.5rem', height: '2px', background: 'var(--color-leaf)', borderRadius: '2px' }} />
              How It's Made
            </p>
            <h2 className="section-title mb-4">
              Rooted in Traditional Panchagavya Farming
            </h2>
            <p className="section-subtitle mb-8">
              Our vermicompost is produced using time-honoured cow-based inputs. The steps below represent our current understanding — all details must be confirmed and verified by the business before publishing.
            </p>

            <div
              className="inline-block px-4 py-2 rounded-lg text-sm"
              style={{
                background: 'rgba(33,78,52,0.06)',
                border: '1px solid rgba(33,78,52,0.15)',
                color: 'var(--color-forest)',
                fontStyle: 'italic',
              }}
            >
              ⚠️ Content marked [Confirm with business] is a placeholder and must be verified before publishing.
            </div>
          </div>

          {/* Steps */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            {steps.map(({ icon: Icon, step, title, description }) => (
              <motion.div
                key={step}
                variants={fadeLeft}
                className="flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{ background: 'rgba(33,78,52,0.08)', color: 'var(--color-forest)' }}
                  >
                    <Icon size={22} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-leaf)', letterSpacing: '0.05em' }}>
                      STEP {step}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.375rem' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
