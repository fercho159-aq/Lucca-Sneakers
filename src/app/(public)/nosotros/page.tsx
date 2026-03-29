import { Metadata } from 'next'
import NosotrosContent from '@/components/nosotros/NosotrosContent'

export const metadata: Metadata = {
  title: 'Nosotros | Lucca Sneakers - Tepito, CDMX',
  description:
    'Conoce la historia de Lucca Sneakers. Desde Tepito, CDMX, llevamos los modelos mas en tendencia al mejor precio.',
}

export default function NosotrosPage() {
  return <NosotrosContent />
}
