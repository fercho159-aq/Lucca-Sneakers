'use client'

import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <section className="pt-28 pb-12 px-4">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-white">
          ENCUÉNTRANOS EN TEPITO
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Ven a conocer nuestros modelos en persona
        </p>
      </motion.div>
    </section>
  )
}
