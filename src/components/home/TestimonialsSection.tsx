'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'
import Badge from '@/components/ui/Badge'

interface Testimonial {
  id: string
  name: string
  text: string
  type: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="LO QUE DICEN NUESTROS CLIENTES" />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="rounded-xl bg-[#1A1A1A] p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <span className="block text-4xl text-[var(--color-gold)] opacity-50 leading-none mb-2">
                &ldquo;
              </span>
              <p className="text-white leading-relaxed">{t.text}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">{t.name}</span>
                <Badge variant={t.type === 'mayoreo' ? 'wholesale' : 'new'}>
                  {t.type === 'mayoreo' ? 'Mayorista' : 'Cliente'}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
