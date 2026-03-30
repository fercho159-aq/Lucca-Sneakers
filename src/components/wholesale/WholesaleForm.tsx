'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { submitWholesaleInquiry } from '@/lib/wholesale-actions'
import { generateWholesaleInquiryURL } from '@/lib/whatsapp'
import SectionTitle from '@/components/ui/SectionTitle'

export default function WholesaleForm() {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    negocio: '',
    ciudad: '',
    mensaje: '',
    paresEstimados: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await submitWholesaleInquiry({
        name: formData.nombre,
        phone: formData.telefono,
        email: formData.email || undefined,
        businessName: formData.negocio || undefined,
        city: formData.ciudad || undefined,
        message: formData.mensaje,
        estimatedPairs: formData.paresEstimados
          ? parseInt(formData.paresEstimados)
          : undefined,
      })
      setSuccess(true)
    })
  }

  if (success) {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="rounded-2xl bg-[#1A1A1A] border border-white/5 p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="mx-auto h-16 w-16 text-[var(--color-gold)]" />
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-wider text-white">
              MENSAJE ENVIADO
            </h3>
            <p className="mt-2 text-gray-400">
              Nos pondremos en contacto contigo pronto. Gracias por tu interes.
            </p>
            <div className="mt-6">
              <p className="mb-3 text-sm text-gray-400">
                Tambien puedes contactarnos por WhatsApp
              </p>
              <a
                href={generateWholesaleInquiryURL(
                  formData.nombre,
                  formData.paresEstimados ? parseInt(formData.paresEstimados) : undefined
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-bold text-white transition-colors hover:brightness-110"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp Directo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-2xl">
        <SectionTitle
          title="CONTÁCTANOS"
          subtitle="Completa el formulario y te contactaremos con información y disponibilidad."
        />

        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[#1A1A1A] border border-white/5 p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Telefono *
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                placeholder="55 1234 5678"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Nombre del negocio
              </label>
              <input
                type="text"
                name="negocio"
                value={formData.negocio}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                placeholder="Mi tienda de tenis"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                placeholder="CDMX"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Pares estimados
              </label>
              <input
                type="number"
                name="paresEstimados"
                value={formData.paresEstimados}
                onChange={handleChange}
                min="1"
                className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                placeholder="Cantidad aproximada"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm text-gray-400">
              Mensaje *
            </label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none"
              placeholder="Cuentanos que modelos te interesan y en que tallas..."
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-6 py-3.5 font-bold text-black transition-all hover:bg-[var(--color-gold-dark)] cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              {isPending ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
