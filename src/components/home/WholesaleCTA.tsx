'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

export default function WholesaleCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A]">
      <motion.div
        className="mx-auto max-w-4xl px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl uppercase tracking-wider text-white">
          ¿QUIERES REVENDER TENIS?
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Precios especiales desde $550 MXN por par. Empieza tu negocio hoy.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" href="/mayoreo">
            VER MAYOREO
          </Button>
          <Button variant="whatsapp" href={WHATSAPP_URL}>
            PEDIR POR WHATSAPP
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
