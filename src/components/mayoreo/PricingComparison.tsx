'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { WHATSAPP_URL, getWhatsAppURL } from '@/lib/constants'

const MENUDEO_BENEFITS = [
  'Todos los modelos disponibles',
  'Atención personalizada',
  'Cambios y garantía',
]

const MAYOREO_BENEFITS = [
  'Todos los modelos disponibles',
  'Atención personalizada',
  'Cambios y garantía',
  'Asesoría para tu negocio',
]

export default function PricingComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Menudeo */}
          <motion.div
            className="rounded-xl bg-[#1A1A1A] p-8 border border-white/5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wider text-white">
              MENUDEO
            </h3>
            <p className="mt-4 font-[family-name:var(--font-display)] text-5xl text-white">
              $650 <span className="text-lg text-gray-400">MXN/par</span>
            </p>
            <p className="mt-2 text-sm text-gray-400">1-5 pares</p>

            <ul className="mt-6 space-y-3">
              {MENUDEO_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button variant="secondary" href={WHATSAPP_URL} className="w-full">
                Comprar Menudeo
              </Button>
            </div>
          </motion.div>

          {/* Mayoreo */}
          <motion.div
            className="relative rounded-xl bg-[#1A1A1A] p-8 border-2 border-gold"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="absolute -top-3 right-4">
              <Badge variant="new">RECOMENDADO</Badge>
            </div>

            <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wider text-white">
              MAYOREO
            </h3>
            <p className="mt-4 font-[family-name:var(--font-display)] text-5xl text-gold">
              $550 <span className="text-lg text-gray-400">MXN/par</span>
            </p>
            <p className="mt-2 text-sm text-gray-400">6+ pares</p>

            <ul className="mt-6 space-y-3">
              {MAYOREO_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                variant="primary"
                href={getWhatsAppURL('Hola, me interesa el precio de mayoreo')}
                className="w-full"
              >
                Comprar Mayoreo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Savings callout */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        >
          <p className="text-lg text-gold font-semibold">
            Ahorra $100 MXN por par
          </p>
        </motion.div>
      </div>
    </section>
  )
}
