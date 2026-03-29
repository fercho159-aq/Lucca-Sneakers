'use client'

import SectionTitle from '@/components/ui/SectionTitle'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/components/ui/ProductCard'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="TAMBIÉN TE PUEDE GUSTAR" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
