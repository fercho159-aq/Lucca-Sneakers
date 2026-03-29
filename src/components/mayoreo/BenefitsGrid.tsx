'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Boxes, RefreshCw, DollarSign, Users, Truck, Shield } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const BENEFITS = [
  { icon: Boxes, text: 'Más de 200 modelos disponibles' },
  { icon: RefreshCw, text: 'Nuevos modelos cada semana' },
  { icon: DollarSign, text: 'El mejor precio del mercado' },
  { icon: Users, text: 'Asesoría para tu negocio' },
  { icon: Truck, text: 'Envíos a toda la República' },
  { icon: Shield, text: 'Garantía de calidad' },
]

export default function BenefitsGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title="BENEFICIOS PARA MAYORISTAS" />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.text}
              className="flex items-start gap-4 rounded-xl bg-[#1A1A1A] p-6 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
            >
              <benefit.icon className="h-6 w-6 text-gold shrink-0 mt-0.5" />
              <p className="text-white">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
