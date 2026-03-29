'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Package, TrendingUp, DollarSign, Shield } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const PROPS = [
  {
    icon: Package,
    title: '200+ Modelos',
    description: 'La mayor variedad de tenis en tendencia',
  },
  {
    icon: TrendingUp,
    title: 'Siempre en Tendencia',
    description: '15-20 modelos nuevos cada semana',
  },
  {
    icon: DollarSign,
    title: 'Mejor Precio',
    description: 'Desde $550 MXN en mayoreo',
  },
  {
    icon: Shield,
    title: 'Calidad Premium',
    description: 'Materiales y acabados de primera',
  },
]

export default function ValueProps() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="POR QUÉ ELEGIRNOS" />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROPS.map((prop, i) => (
            <motion.div
              key={prop.title}
              className="rounded-xl bg-[#1A1A1A] p-6 border border-white/5"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
            >
              <prop.icon className="h-8 w-8 text-gold mb-4" />
              <h3 className="text-lg font-semibold text-white">{prop.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{prop.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
