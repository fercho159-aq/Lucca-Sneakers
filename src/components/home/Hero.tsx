'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      />
      {/* Dark overlay gradient from left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      <motion.div
        className="relative z-10 max-w-3xl px-6 md:px-12 lg:px-20"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-white leading-[0.95]"
          variants={fadeUp}
        >
          TUS TENIS
          <br />
          FAVORITOS
          <br />
          <span className="text-[var(--color-gold)]">AL MEJOR PRECIO</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-lg"
          variants={fadeUp}
        >
          +200 modelos &middot; Desde $550 MXN &middot; Tepito, CDMX
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4"
          variants={fadeUp}
        >
          <Button variant="primary" size="lg" href="/catalogo">
            VER CATÁLOGO
          </Button>
          <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
            PEDIR POR WHATSAPP
          </Button>
        </motion.div>
      </motion.div>

      {/* Bouncing chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-8 w-8 text-gray-500" />
      </motion.div>
    </section>
  )
}
