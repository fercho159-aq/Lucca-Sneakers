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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,208,0,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,208,0,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,208,0,0.05)_0%,transparent_40%)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-[family-name:var(--font-display)] text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-white"
          variants={fadeUp}
        >
          TUS TENIS FAVORITOS
          <br />
          AL MEJOR PRECIO
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-400"
          variants={fadeUp}
        >
          +200 modelos &middot; Desde $550 MXN &middot; Tepito, CDMX
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <Button variant="primary" href="/catalogo">
            VER CATÁLOGO
          </Button>
          <Button variant="whatsapp" href={WHATSAPP_URL}>
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
