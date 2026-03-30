'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Footprints, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/components/ui/ProductCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'

interface FeaturedGridProps {
  products: Product[]
}

const AUTOPLAY_MS = 4500
const SWIPE_THRESHOLD = 50

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.95,
  }),
}

export default function FeaturedGrid({ products }: FeaturedGridProps) {
  const [[current, direction], setCurrent] = useState([0, 0])
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const total = products.length

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + total) % total
        return [next, dir]
      })
    },
    [total]
  )

  const goTo = useCallback(
    (index: number) => {
      setCurrent(([prev]) => [index, index > prev ? 1 : -1])
    },
    []
  )

  // Autoplay
  useEffect(() => {
    if (isPaused || total <= 1) return
    const timer = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [isPaused, paginate, total])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [paginate])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      paginate(diff > 0 ? 1 : -1)
    }
  }

  if (!products.length) return null

  const product = products[current]

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Ambient glow behind the active slide */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          title="Modelos Destacados"
          subtitle="Lo mejor de esta temporada, seleccionado para ti"
        />

        {/* Showcase carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main slide area */}
          <div className="relative min-h-[480px] md:min-h-[520px] lg:min-h-[500px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={product.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Product image */}
                  <Link
                    href={`/catalogo/${product.slug}`}
                    className="group relative block aspect-square max-h-[420px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-dark to-[#1a1a1a]"
                  >
                    {product.image ? (
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Footprints className="h-24 w-24 text-white/10" />
                      </div>
                    )}

                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Badges */}
                    {(product.isNew || product.isHot) && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        {product.isNew && <Badge variant="new">NEW</Badge>}
                        {product.isHot && <Badge variant="hot">HOT</Badge>}
                      </div>
                    )}
                  </Link>

                  {/* Product info */}
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <motion.p
                      className="text-sm font-medium uppercase tracking-[0.2em] text-gold/80 font-[family-name:var(--font-body)]"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                    >
                      {product.brand}
                    </motion.p>

                    <motion.h3
                      className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-wider text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {product.name}
                    </motion.h3>

                    <motion.div
                      className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        href={`/catalogo/${product.slug}`}
                      >
                        Ver Detalles
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                aria-label="Modelo anterior"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-gold cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Siguiente modelo"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-gold cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {total > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al modelo ${i + 1}`}
                className="group/dot relative h-3 w-3 cursor-pointer"
              >
                <span
                  className={`block h-full w-full rounded-full transition-all duration-300 ${
                    i === current
                      ? 'scale-100 bg-gold'
                      : 'scale-75 bg-white/25 group-hover/dot:bg-white/50'
                  }`}
                />
                {/* Autoplay progress ring on active dot */}
                {i === current && !isPaused && (
                  <motion.span
                    className="absolute inset-[-3px] rounded-full border-2 border-gold/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: AUTOPLAY_MS / 1000,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* CTA link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-lg text-white/70 transition-colors hover:text-gold"
          >
            Explora todos los modelos
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
