export const dynamic = 'force-dynamic'

import { getFeaturedProducts, getTestimonials } from '@/lib/actions'
import Hero from '@/components/home/Hero'
import ValueProps from '@/components/home/ValueProps'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import StatsBar from '@/components/home/StatsBar'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import WholesaleCTA from '@/components/home/WholesaleCTA'
import FinalCTA from '@/components/home/FinalCTA'

export const metadata = {
  title: 'Lucca Sneakers | Tenis Premium en Tepito, CDMX',
  description:
    'Tenis de calidad premium al mejor precio. +200 modelos en tendencia. Menudeo desde $650 MXN, mayoreo desde $550 MXN. Tepito, Ciudad de México.',
}

export default async function Home() {
  const [products, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getTestimonials(),
  ])

  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedGrid products={products} />
      <StatsBar />
      <TestimonialsSection testimonials={testimonials} />
      <WholesaleCTA />
      <FinalCTA />
    </>
  )
}
