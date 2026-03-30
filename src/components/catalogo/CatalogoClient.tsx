'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/components/ui/ProductCard'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { BRANDS, WHATSAPP_URL } from '@/lib/constants'
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface CatalogoClientProps {
  initialProducts: Product[]
}

/* ─── Brand Carousel Section ─── */

function BrandSection({
  brand,
  products,
  index,
}: {
  brand: string
  products: Product[]
  index: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [showAll, setShowAll] = useState(false)

  const displayProducts = showAll ? products : products.slice(0, 10)

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return
    const cardWidth =
      container.querySelector<HTMLElement>(':scope > div')?.offsetWidth ?? 300
    const scrollAmount = cardWidth * 2 + 24
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      id={`brand-${brand.toLowerCase().replace(/\s+/g, '-')}`}
      className="mb-16 scroll-mt-32"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Brand header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider text-white">
            {brand}
            <span className="ml-3 text-lg md:text-xl text-gold align-middle">
              ({products.length})
            </span>
          </h3>
          <div className="mt-2 h-1 w-12 bg-gold" />
        </div>

        <div className="flex items-center gap-2">
          {/* Carousel arrows — hidden when showing all */}
          {!showAll && (
            <>
              <button
                onClick={() => scroll('left')}
                aria-label="Anterior"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] border border-white/10 text-white/70 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Siguiente"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] border border-white/10 text-white/70 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {products.length > 10 && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="ml-2 rounded-full bg-[#1A1A1A] border border-white/10 px-5 py-2 text-sm text-gray-300 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
            >
              {showAll ? 'Colapsar' : 'Ver todos'}
            </button>
          )}
        </div>
      </div>

      {/* Products: carousel or expanded grid */}
      {showAll ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-[280px] lg:w-[300px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </motion.section>
  )
}

/* ─── Main Catalog Client ─── */

export default function CatalogoClient({ initialProducts }: CatalogoClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return initialProducts
    const q = searchQuery.toLowerCase()
    return initialProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
  }, [searchQuery, initialProducts])

  // Group by brand, preserving BRANDS order, only brands with products
  const brandGroups = useMemo(() => {
    const map = new Map<string, Product[]>()

    for (const brand of BRANDS) {
      map.set(brand, [])
    }

    for (const product of filteredProducts) {
      const existing = map.get(product.brand)
      if (existing) {
        existing.push(product)
      } else {
        map.set(product.brand, [product])
      }
    }

    return Array.from(map.entries()).filter(([, products]) => products.length > 0)
  }, [filteredProducts])

  const scrollToBrand = (brand: string) => {
    const id = `brand-${brand.toLowerCase().replace(/\s+/g, '-')}`
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Brands that actually have products (for the nav bar)
  const activeBrands = useMemo(() => {
    const set = new Set(filteredProducts.map((p) => p.brand))
    return BRANDS.filter((b) => set.has(b))
  }, [filteredProducts])

  return (
    <section className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header banner */}
        <div className="relative mb-10 overflow-hidden rounded-2xl">
          <Image
            src="/images/new-arrivals.png"
            alt="Modelos de sneakers"
            width={1400}
            height={350}
            className="w-full h-40 md:h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent" />
        </div>

        <SectionTitle
          title="NUESTRO CATÁLOGO"
          subtitle="El inventario cambia cada semana. Confirma disponibilidad por WhatsApp."
        />

        {/* Search bar */}
        <div className="relative mx-auto mb-8 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar modelo o marca..."
            className="w-full rounded-xl bg-[#1A1A1A] border border-white/10 py-3 pl-12 pr-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold/50 transition-colors font-[family-name:var(--font-body)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Limpiar busqueda"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Brand nav — scroll-to-section */}
        <div className="mb-12 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {BRANDS.map((brand) => {
            const isActive = activeBrands.includes(brand)
            return (
              <button
                key={brand}
                onClick={() => scrollToBrand(brand)}
                disabled={!isActive}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white hover:text-gold hover:border-gold/40 border border-white/10 cursor-pointer'
                    : 'bg-[#111] text-gray-600 border border-white/5 cursor-not-allowed'
                }`}
              >
                {brand}
              </button>
            )
          })}
        </div>

        {/* Brand sections */}
        {brandGroups.length > 0 ? (
          brandGroups.map(([brand, products], i) => (
            <BrandSection
              key={brand}
              brand={brand}
              products={products}
              index={i}
            />
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-400">
              No se encontraron modelos para{' '}
              <span className="text-white font-semibold">
                &ldquo;{searchQuery}&rdquo;
              </span>
            </p>
          </div>
        )}

        {/* Bottom banner */}
        <div className="mt-16 rounded-xl bg-[#1A1A1A] p-8 text-center border border-white/5">
          <p className="text-lg text-gray-400">
            ¿No encuentras tu modelo? Tenemos más de 200 disponibles.
          </p>
          <div className="mt-4">
            <Button variant="whatsapp" href={WHATSAPP_URL}>
              Preguntar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
