'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

export default function FinalCTA() {
  return (
    <section className="py-20">
      <motion.div
        className="mx-auto max-w-4xl px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl uppercase tracking-wider text-white">
          ¿LISTO PARA TUS NUEVOS TENIS?
        </h2>
        <div className="mt-8">
          <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
            PEDIR POR WHATSAPP
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Respondemos en menos de 5 minutos
        </p>
      </motion.div>
    </section>
  )
}
