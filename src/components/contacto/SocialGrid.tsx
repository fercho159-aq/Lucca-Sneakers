'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Globe, Video, Play } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { SOCIAL_LINKS } from '@/lib/constants'

const SOCIALS = [
  {
    icon: Camera,
    name: 'Instagram',
    description: 'Modelos nuevos cada día',
    href: SOCIAL_LINKS.instagram,
  },
  {
    icon: Globe,
    name: 'Facebook',
    description: 'Novedades y contenido exclusivo',
    href: SOCIAL_LINKS.facebook,
  },
  {
    icon: Video,
    name: 'TikTok',
    description: 'Videos de nuestros modelos',
    href: SOCIAL_LINKS.tiktok,
  },
  {
    icon: Play,
    name: 'YouTube',
    description: 'Reviews y unboxings',
    href: SOCIAL_LINKS.youtube,
  },
]

export default function SocialGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title="SÍGUENOS EN REDES" />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SOCIALS.map((social, i) => (
            <motion.div
              key={social.name}
              className="rounded-xl bg-[#1A1A1A] p-6 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
            >
              <social.icon className="h-8 w-8 text-gold mb-3" />
              <h3 className="text-lg font-semibold text-white">{social.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{social.description}</p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" href={social.href}>
                  Seguir &rarr;
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
