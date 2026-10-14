import { HeroSection } from '@/components/sections/HeroSection'
import { ProductShowcase } from '@/components/sections/ProductShowcase'
import { DosageCalculatorSection } from '@/components/sections/DosageCalculatorSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { MissionSection } from '@/components/sections/MissionSection'
import { PackSelectorSection } from '@/components/sections/PackSelectorSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ContactSection } from '@/components/sections/ContactSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <DosageCalculatorSection />
      <ProcessSection />
      <MissionSection />
      <PackSelectorSection />
      <FaqSection />
      <ContactSection />
    </>
  )
}
