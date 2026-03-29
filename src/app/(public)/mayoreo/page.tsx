export const dynamic = 'force-dynamic'

import { getFAQs } from '@/lib/actions'
import MayoreoHero from '@/components/mayoreo/MayoreoHero'
import HowItWorks from '@/components/mayoreo/HowItWorks'
import PricingComparison from '@/components/mayoreo/PricingComparison'
import BenefitsGrid from '@/components/mayoreo/BenefitsGrid'
import FAQAccordion from '@/components/mayoreo/FAQAccordion'
import WholesaleForm from '@/components/wholesale/WholesaleForm'
import MayoreoCTA from '@/components/mayoreo/MayoreoCTA'

export const metadata = {
  title: 'Mayoreo | Lucca Sneakers - Precio Especial para Revendedores',
  description:
    'Precio de mayoreo desde $550 MXN por par. Mínimo 6 pares. Más de 200 modelos disponibles. Inicia tu negocio de tenis hoy.',
}

export default async function MayoreoPage() {
  const faqs = await getFAQs()

  return (
    <>
      <MayoreoHero />
      <HowItWorks />
      <PricingComparison />
      <BenefitsGrid />
      <FAQAccordion faqs={faqs} />
      <WholesaleForm />
      <MayoreoCTA />
    </>
  )
}
