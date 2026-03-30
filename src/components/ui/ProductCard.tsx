'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Footprints } from 'lucide-react'
import Badge from '@/components/ui/Badge'

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  priceRetail: number
  priceWholesale: number
  image: string | null
  sizes: string[]
  isNew: boolean
  isHot: boolean
  slug: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="group overflow-hidden rounded-xl bg-gray-dark"
      whileHover={{
        scale: 1.02,
        boxShadow: '0 8px 32px rgba(245, 208, 0, 0.15)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link href={`/catalogo/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-dark to-gray-mid">
              <Footprints className="h-16 w-16 text-white opacity-20" />
            </div>
          )}

          {/* Badges */}
          {(product.isNew || product.isHot) && (
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {product.isNew && <Badge variant="new">NEW</Badge>}
              {product.isHot && <Badge variant="hot">HOT</Badge>}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white truncate">{product.name}</h3>
          <p className="text-sm text-gray-400">{product.brand}</p>
        </div>
      </Link>
    </motion.div>
  )
}
