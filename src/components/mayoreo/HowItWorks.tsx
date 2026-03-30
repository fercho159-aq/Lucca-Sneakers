'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, MessageCircle, Handshake } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const STEPS = [
  {
    num: 1,
    icon: Search,
    title: 'Explora Nuestro Catálogo',
    description: 'Revisa nuestros modelos o solicita información por WhatsApp',
  },
  {
    num: 2,
    icon: MessageCircle,
    title: 'Contáctanos',
    description: 'Platícanos sobre tu negocio y lo que necesitas',
  },
  {
    num: 3,
    icon: Handshake,
    title: 'Iniciamos la Alianza',
    description: 'Te damos toda la información para comenzar a trabajar juntos',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title="CÓMO FUNCIONA" />

        <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-16 left-[16.67%] right-[16.67%] hidden md:block border-t-2 border-dashed border-white/10" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.2, ease: 'easeOut' }}
            >
              {/* Numbered circle */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black font-bold text-lg">
                {step.num}
              </div>

              <step.icon className="mt-4 h-8 w-8 text-gold" />
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-400 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
