'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface StatsCounterProps {
  value: string
  label: string
}

export default function StatsCounter({ value, label }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  // Parse numeric part and suffix (e.g., "200+" -> 200 and "+")
  const match = value.match(/^(\d+)(.*)$/)
  const numericTarget = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''

  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) {
      animate(motionValue, numericTarget, {
        duration: 2,
        ease: 'easeOut',
      })
    }
  }, [isInView, motionValue, numericTarget])

  return (
    <div ref={ref} className="text-center">
      <div className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-gold">
        <AnimatedNumber value={rounded} />
        {suffix}
      </div>
      <p className="mt-2 text-sm text-gray-400">{label}</p>
    </div>
  )
}

function AnimatedNumber({ value }: { value: ReturnType<typeof useTransform<number, number>> }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const unsubscribe = value.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = String(v)
      }
    })
    return unsubscribe
  }, [value])

  return <span ref={ref}>0</span>
}
