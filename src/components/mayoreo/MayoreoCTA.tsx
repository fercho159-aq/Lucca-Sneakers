'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { getWhatsAppURL } from '@/lib/constants'

export default function MayoreoCTA() {
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
          HABLEMOS
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Estamos listos para resolver tus dudas y explorar oportunidades de colaboración.
        </p>
        <div className="mt-8">
          <Button
            variant="whatsapp"
            size="lg"
            href={getWhatsAppURL('Hola, me interesa información sobre distribución')}
          >
            CONTACTAR POR WHATSAPP
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
