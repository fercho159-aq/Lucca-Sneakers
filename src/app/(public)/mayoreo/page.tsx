export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getFAQs } from '@/lib/actions'
import { SITE_URL, getBreadcrumbJsonLd, getFAQPageJsonLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import MayoreoHero from '@/components/mayoreo/MayoreoHero'
import HowItWorks from '@/components/mayoreo/HowItWorks'
import BenefitsGrid from '@/components/mayoreo/BenefitsGrid'
import FAQAccordion from '@/components/mayoreo/FAQAccordion'
import WholesaleForm from '@/components/wholesale/WholesaleForm'
import MayoreoCTA from '@/components/mayoreo/MayoreoCTA'

export const metadata: Metadata = {
  title: 'Mayoreo y Distribución | Alianzas Comerciales',
  description:
    'Programa de mayoreo y distribución de tenis premium. Más de 200 modelos disponibles desde $550 MXN por par. Contáctanos por WhatsApp para alianzas comerciales. Tepito, CDMX.',
  keywords: [
    'mayoreo tenis',
    'distribución tenis',
    'tenis al por mayor',
    'venta mayoreo cdmx',
    'tenis mayoreo tepito',
    'proveedor tenis mexico',
  ],
  alternates: {
    canonical: `${SITE_URL}/mayoreo`,
  },
  openGraph: {
    title: 'Mayoreo y Distribución | Lucca Sneakers',
    description:
      'Programa de mayoreo de tenis premium. +200 modelos disponibles desde $550 MXN. Contáctanos para alianzas comerciales.',
    url: `${SITE_URL}/mayoreo`,
    images: [
      {
        url: '/images/wholesale-banner.png',
        width: 1200,
        height: 630,
        alt: 'Mayoreo Lucca Sneakers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mayoreo y Distribución | Lucca Sneakers',
    description:
      'Programa de mayoreo de tenis premium. +200 modelos desde $550 MXN. Tepito, CDMX.',
    images: ['/images/wholesale-banner.png'],
  },
}

export default async function MayoreoPage() {
  const faqs = await getFAQs()

  const faqItems = faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }))

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', url: '/' },
          { name: 'Mayoreo', url: '/mayoreo' },
        ])}
      />
      {faqItems.length > 0 && <JsonLd data={getFAQPageJsonLd(faqItems)} />}
      <MayoreoHero />
      <HowItWorks />
      <BenefitsGrid />
      <FAQAccordion faqs={faqs} />
      <WholesaleForm />
      <MayoreoCTA />
    </>
  )
}
