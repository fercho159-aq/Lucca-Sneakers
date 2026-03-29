'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left'
      )}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-white">
        {title}
      </h2>
      <div
        className={cn(
          'mt-4 h-1 w-16 bg-gold',
          align === 'center' && 'mx-auto',
        )}
      />
      {subtitle && (
        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
