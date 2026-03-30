'use client'

import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/components/ui/ProductCard'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'

interface FeaturedGridProps {
  products: Product[]
}

export default function FeaturedGrid({ products }: FeaturedGridProps) {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* New arrivals banner */}
        <div className="relative mb-12 overflow-hidden rounded-2xl">
          <Image
            src="/images/new-arrivals.png"
            alt="Nuevos modelos de sneakers"
            width={1400}
            height={400}
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent" />
        </div>

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
