'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <SectionTitle title="PREGUNTAS FRECUENTES" />

        <div className="rounded-xl bg-[#1A1A1A] overflow-hidden">
          {faqs.map((faq, i) => (
            <div
              key={faq.id}
              className={i < faqs.length - 1 ? 'border-b border-white/5' : ''}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="flex w-full items-center justify-between p-6 text-left cursor-pointer"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.span>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
