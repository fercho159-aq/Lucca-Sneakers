export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getTestimonials } from '@/lib/actions'
import { SITE_URL } from '@/lib/seo'
import Hero from '@/components/home/Hero'
import ValueProps from '@/components/home/ValueProps'
import MediaShowcase from '@/components/home/MediaShowcase'
import StatsBar from '@/components/home/StatsBar'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import WholesaleCTA from '@/components/home/WholesaleCTA'
import FinalCTA from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'Lucca Sneakers | Colección de Tenis Premium en Tepito, CDMX',
  description:
    'Explora nuestra colección de tenis premium. +200 modelos en tendencia de Nike, Adidas, Jordan, New Balance y Puma. Visítanos en Tepito, Ciudad de México. Precios desde $650 MXN.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Lucca Sneakers | Colección de Tenis Premium en Tepito, CDMX',
    description:
      'Explora nuestra colección de tenis premium. +200 modelos en tendencia. Visítanos en Tepito, Ciudad de México.',
    url: SITE_URL,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lucca Sneakers - Tenis Premium en Tepito',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucca Sneakers | Colección de Tenis Premium en Tepito, CDMX',
    description:
      '+200 modelos de tenis premium en tendencia. Nike, Adidas, Jordan y más. Tepito, CDMX.',
    images: ['/images/og-image.png'],
  },
}

export default async function Home() {
  const testimonials = await getTestimonials()

  return (
    <>
      <Hero />
      <ValueProps />
      <MediaShowcase />
      <StatsBar />
      <TestimonialsSection testimonials={testimonials} />
      <WholesaleCTA />
      <FinalCTA />
    </>
  )
}
