export const dynamic = 'force-dynamic'

import { getFAQs } from '@/lib/actions'
import MayoreoHero from '@/components/mayoreo/MayoreoHero'
import HowItWorks from '@/components/mayoreo/HowItWorks'
import BenefitsGrid from '@/components/mayoreo/BenefitsGrid'
import FAQAccordion from '@/components/mayoreo/FAQAccordion'
import WholesaleForm from '@/components/wholesale/WholesaleForm'
import MayoreoCTA from '@/components/mayoreo/MayoreoCTA'

export const metadata = {
  title: 'Distribución | Lucca Sneakers - Alianzas Comerciales',
  description:
    'Conoce nuestro programa de distribución. Más de 200 modelos disponibles. Contáctanos para información sobre alianzas comerciales.',
}

export default async function MayoreoPage() {
  const faqs = await getFAQs()

  return (
    <>
      <MayoreoHero />
      <HowItWorks />
      <BenefitsGrid />
      <FAQAccordion faqs={faqs} />
      <WholesaleForm />
      <MayoreoCTA />
    </>
  )
}
