'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Crown } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import SectionTitle from '@/components/ui/SectionTitle'
import StatsCounter from '@/components/ui/StatsCounter'
import Button from '@/components/ui/Button'
import { SOCIAL_LINKS, WHATSAPP_URL } from '@/lib/constants'

const STATS_DATA = [
  { value: '200+', label: 'Modelos Disponibles' },
  { value: '15', label: 'Modelos Nuevos por Semana' },
  { value: '500+', label: 'Clientes Mayoreo' },
  { value: '5+', label: 'Anos de Experiencia' },
]

const SOCIALS = [
  {
    icon: FaInstagram,
    href: SOCIAL_LINKS.instagram,
    label: 'Instagram',
    color: 'from-purple-500 to-pink-500',
    description: 'Siguenos para ver los modelos mas nuevos',
  },
  {
    icon: FaFacebookF,
    href: SOCIAL_LINKS.facebook,
    label: 'Facebook',
    color: 'from-blue-600 to-blue-400',
    description: 'Ofertas y promociones exclusivas',
  },
  {
    icon: FaTiktok,
    href: SOCIAL_LINKS.tiktok,
    label: 'TikTok',
    color: 'from-gray-800 to-gray-600',
    description: 'Videos de nuestros mejores modelos',
  },
  {
    icon: FaYoutube,
    href: SOCIAL_LINKS.youtube,
    label: 'YouTube',
    color: 'from-red-600 to-red-400',
    description: 'Reviews y unboxings',
  },
]

export default function NosotrosContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            LUCCA SNEAKERS
          </motion.h1>
          <motion.p
            className="mt-4 font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-wider text-[var(--color-gold)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            CAMINA COMO REY 👑
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Crown className="mx-auto h-12 w-12 text-[var(--color-gold)] mb-6" />
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
              Desde el corazon de Tepito, traemos los modelos mas en tendencia
              al mejor precio de la ciudad.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              Con mas de 200 modelos en existencia y novedades cada semana, somos
              la mejor opcion en sneakers de calidad premium.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1A1A1A] py-16">
        <div className="mx-auto max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS_DATA.map((stat) => (
            <StatsCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="SIGUENOS" subtitle="Mantente al dia con los modelos mas nuevos" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOCIALS.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl bg-[#1A1A1A] border border-white/5 p-5 transition-all hover:border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${social.color}`}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{social.label}</p>
                  <p className="text-sm text-gray-400">{social.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Visit us */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/5 p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-wider text-white">
              VISITANOS EN TEPITO
            </h2>

            <div className="mt-6 flex flex-col items-center gap-3 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[var(--color-gold)]" />
                <span>Tepito, Ciudad de Mexico</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[var(--color-gold)]" />
                <span>Lun-Sab 10AM-7PM &middot; Dom 10AM-4PM</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp
              </Button>
              <Button variant="secondary" href="/catalogo">
                Ver Catalogo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
