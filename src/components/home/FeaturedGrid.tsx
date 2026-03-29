'use client'

import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/components/ui/ProductCard'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'

interface FeaturedGridProps {
  products: Product[]
}

export default function FeaturedGrid({ products }: FeaturedGridProps) {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="LO MÁS HOT ESTA SEMANA" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" href="/catalogo">
            Ver Todo el Catálogo &rarr;
          </Button>
        </div>
      </div>
    </section>
  )
}
