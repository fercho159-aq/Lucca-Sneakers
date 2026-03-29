'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/components/ui/ProductCard'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { BRANDS, WHATSAPP_URL } from '@/lib/constants'

interface CatalogoClientProps {
  initialProducts: Product[]
}

export default function CatalogoClient({ initialProducts }: CatalogoClientProps) {
  const [selectedBrand, setSelectedBrand] = useState('all')

  const filteredProducts = useMemo(() => {
    if (selectedBrand === 'all') return initialProducts
    return initialProducts.filter((p) => p.brand === selectedBrand)
  }, [selectedBrand, initialProducts])

  const allBrands = ['all', ...BRANDS] as const

  return (
    <section className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="NUESTRO CATÁLOGO"
          subtitle="El inventario cambia cada semana. Confirma disponibilidad por WhatsApp."
        />

        {/* Brand filter */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-gold text-black'
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {brand === 'all' ? 'Todos' : brand}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            key={selectedBrand}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-400">
              Próximamente más modelos de{' '}
              <span className="text-white font-semibold">{selectedBrand}</span>
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
