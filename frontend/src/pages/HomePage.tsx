import { HeroSection } from '@/components/sections/HeroSection'
import { TrustMarqueeRibbon } from '@/components/sections/TrustMarqueeRibbon'
import { ProductShowcase } from '@/components/sections/ProductShowcase'
import { SoilComparisonSection } from '@/components/sections/SoilComparisonSection'
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
      <TrustMarqueeRibbon />
      <ProductShowcase />
      <SoilComparisonSection />
      <DosageCalculatorSection />
      <ProcessSection />
      <MissionSection />
      <PackSelectorSection />
      <FaqSection />
      <ContactSection />
    </>
  )
}
