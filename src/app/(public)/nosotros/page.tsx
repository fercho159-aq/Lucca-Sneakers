import type { Metadata } from 'next'
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import NosotrosContent from '@/components/nosotros/NosotrosContent'

export const metadata: Metadata = {
  title: 'Nosotros | Nuestra Historia en Tepito, CDMX',
  description:
    'Conoce la historia de Lucca Sneakers. Más de 5 años exhibiendo los modelos de tenis más en tendencia desde Tepito, Ciudad de México. +500 clientes de mayoreo satisfechos.',
  keywords: [
    'lucca sneakers historia',
    'tienda tenis tepito',
    'sneakers cdmx',
    'quienes somos lucca sneakers',
  ],
  alternates: {
    canonical: `${SITE_URL}/nosotros`,
  },
  openGraph: {
    title: 'Nosotros | Lucca Sneakers - Tepito, CDMX',
    description:
      'Conoce la historia de Lucca Sneakers. Más de 5 años exhibiendo los modelos de tenis más en tendencia desde Tepito, CDMX.',
    url: `${SITE_URL}/nosotros`,
    images: [
      {
        url: '/images/about-store.png',
        width: 1200,
        height: 630,
        alt: 'Sobre Lucca Sneakers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros | Lucca Sneakers',
    description:
      'Más de 5 años exhibiendo tenis premium desde Tepito, CDMX. Conoce nuestra historia.',
    images: ['/images/about-store.png'],
  },
}

export default function NosotrosPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', url: '/' },
          { name: 'Nosotros', url: '/nosotros' },
        ])}
      />
      <NosotrosContent />
    </>
  )
}
