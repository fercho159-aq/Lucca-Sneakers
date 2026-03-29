'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function MayoreoHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,208,0,0.08)_0%,transparent_60%)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.h1
          className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-white"
          variants={fadeUp}
        >
          INICIA TU NEGOCIO DE TENIS HOY
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-400"
          variants={fadeUp}
        >
          Precio de mayoreo desde $550 MXN por par. Más de 200 modelos disponibles.
        </motion.p>
      </motion.div>
    </section>
  )
}
