import ContactHero from '@/components/contacto/ContactHero'
import ContactGrid from '@/components/contacto/ContactGrid'
import SocialGrid from '@/components/contacto/SocialGrid'
import ContactCTA from '@/components/contacto/ContactCTA'

export const metadata = {
  title: 'Contacto | Lucca Sneakers - Tepito, CDMX',
  description:
    'Visítanos en Tepito, CDMX. WhatsApp: 735 388 4148. Lunes a Sábado 10AM-7PM, Domingo 10AM-4PM.',
}

export default function ContactoPage() {
  return (
    <>
      <ContactHero />
      <ContactGrid />
      <SocialGrid />
      <ContactCTA />
    </>
  )
}
