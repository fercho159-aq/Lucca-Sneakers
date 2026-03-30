'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

export default function WholesaleCTA() {
  return (
    <section
      className="relative py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/wholesale-banner.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl uppercase tracking-wider text-white">
          ¿INTERESADO EN DISTRIBUCIÓN?
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Conoce nuestro programa de distribución y alianzas comerciales.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" href="/mayoreo">
            VER DISTRIBUCIÓN
          </Button>
          <Button variant="whatsapp" href={WHATSAPP_URL}>
            CONSULTAR POR WHATSAPP
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
