import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

export default function ContactCTA() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] p-10 text-center border border-white/5">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl uppercase tracking-wider text-white">
          ¿TIENES ALGUNA PREGUNTA?
        </h2>
        <p className="mt-4 text-gray-400">
          Escríbenos por WhatsApp y te respondemos en minutos
        </p>
        <div className="mt-6">
          <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
            ABRIR WHATSAPP
          </Button>
        </div>
      </div>
    </section>
  )
}
