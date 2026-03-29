import { MessageCircle, Clock, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

export default function ContactGrid() {
  return (
    <section className="py-12 px-4">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Contact info */}
        <div className="space-y-8">
          {/* WhatsApp */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A]">
              <MessageCircle className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
              <p className="text-gray-400">735 388 4148</p>
              <div className="mt-2">
                <Button variant="whatsapp" size="sm" href={WHATSAPP_URL}>
                  Abrir WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Horario */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A]">
              <Clock className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Horario</h3>
              <p className="text-gray-400">Lunes a Sábado: 10:00 AM - 7:00 PM</p>
              <p className="text-gray-400">Domingo: 10:00 AM - 4:00 PM</p>
            </div>
          </div>

          {/* Ubicación */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A]">
              <MapPin className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Ubicación</h3>
              <p className="text-gray-400">Tepito, Cuauhtémoc, Ciudad de México</p>
            </div>
          </div>
        </div>

        {/* Right: Google Maps */}
        <div className="rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5!2d-99.1258!3d19.4436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI2JzM3LjAiTiA5OcKwMDcnMzMuMCJX!5e0!3m2!1ses!2smx!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Lucca Sneakers en Tepito"
          />
        </div>
      </div>
    </section>
  )
}
