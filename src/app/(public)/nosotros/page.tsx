import { Metadata } from 'next'
import NosotrosContent from '@/components/nosotros/NosotrosContent'

export const metadata: Metadata = {
  title: 'Nosotros | Lucca Sneakers - Tepito, CDMX',
  description:
    'Conoce la historia de Lucca Sneakers. Desde Tepito, CDMX, exhibimos los modelos mas en tendencia.',
}

export default function NosotrosPage() {
  return <NosotrosContent />
}
