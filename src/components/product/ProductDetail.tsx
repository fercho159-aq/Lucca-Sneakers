'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Footprints, ShoppingBag, Loader2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import SizeSelector from '@/components/product/SizeSelector'
import WhatsAppOrderButton from '@/components/product/WhatsAppOrderButton'
import { formatPrice } from '@/lib/utils'
import { addToCart } from '@/lib/cart-actions'
import { useCart } from '@/components/cart/CartProvider'

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [addedToCart, setAddedToCart] = useState(false)
  const { refreshCart } = useCart()

  const handleSizeSelect = (size: string, variantId: string) => {
    setSelectedSize(size)
    setSelectedVariantId(variantId)
    setShowError(false)
    setAddedToCart(false)
  }

  const handleAddToCart = () => {
    if (!selectedVariantId) {
      setShowError(true)
      return
    }
    startTransition(async () => {
      await addToCart(selectedVariantId, 1)
      await refreshCart()
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    })
  }

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
                {product.isNew && <Badge variant="new">NUEVO 🔥</Badge>}
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

            {/* Prices */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-400">Menudeo</span>
                <p className="text-2xl font-bold text-white">
                  {formatPrice(product.priceRetail)} MXN
                </p>
              </div>
              <div className="rounded-lg bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 px-4 py-2">
                <span className="text-xs uppercase tracking-wider text-[var(--color-gold)]">Mayoreo</span>
                <p className="text-lg font-bold text-[var(--color-gold)]">
                  {formatPrice(product.priceWholesale)} MXN
                </p>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <SizeSelector
                variants={product.variants}
                selectedSize={selectedSize}
                onSelect={handleSizeSelect}
              />
            </div>

            {/* Error message */}
            {showError && (
              <p className="mt-3 text-sm text-[#EF4444]">
                ⚠️ Selecciona una talla primero
              </p>
            )}

            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <WhatsAppOrderButton
                productName={product.name}
                selectedSize={selectedSize}
                disabled={!selectedSize}
              />

              <button
                onClick={handleAddToCart}
                disabled={isPending}
                className="flex items-center justify-center gap-2 rounded-lg border border-white bg-transparent px-6 py-3.5 font-bold text-white transition-all hover:bg-white/10 cursor-pointer disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ShoppingBag className="h-5 w-5" />
                )}
                {addedToCart ? 'AGREGADO ✓' : 'AGREGAR AL CARRITO'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
