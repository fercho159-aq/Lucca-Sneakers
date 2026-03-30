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
  title: 'Lucca Sneakers | Coleccion de Tenis Premium en Tepito, CDMX',
  description:
    'Explora nuestra coleccion de tenis premium. +200 modelos en tendencia. Visitanos en Tepito, Ciudad de Mexico.',
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
