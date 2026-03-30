'use client'

import { motion } from 'framer-motion'
import { Footprints } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Badge from '@/components/ui/Badge'

interface Variant {
  id: string
  size: string
  stock: number
}

interface ProductWithVariants {
  id: string
  name: string
  slug: string
  brand: string
  category: string
  priceRetail: number
  priceWholesale: number
  image: string | null
  isNew: boolean
  isHot: boolean
  variants: Variant[]
}

interface ProductDetailProps {
  product: ProductWithVariants
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const whatsappMessage = `Hola, me interesa el modelo ${product.name}, ¿tienen disponibilidad?`
  const whatsappURL = `https://wa.me/527353884148?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section className="pt-28 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Image */}
          <motion.div
            className="relative aspect-square overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]">
                <Footprints className="h-24 w-24 text-white opacity-20" />
              </div>
            )}

            {/* Badges */}
            {(product.isNew || product.isHot) && (
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.isNew && <Badge variant="new">NUEVO</Badge>}
                {product.isHot && <Badge variant="hot">HOT</Badge>}
              </div>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-sm uppercase tracking-wider text-gray-400">
              {product.brand}
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-4xl uppercase tracking-wider text-white">
              {product.name}
            </h1>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Modelo {product.name} de {product.brand}. Consulta disponibilidad de tallas y colores por WhatsApp.
            </p>

            {/* Inquiry button */}
            <div className="mt-8">
              <a
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-bold text-white transition-all hover:brightness-110 w-full sm:w-auto"
              >
                <FaWhatsapp className="h-5 w-5" />
                Consultar Disponibilidad
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
