export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getProducts } from '@/lib/actions'
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import CatalogoClient from '@/components/catalogo/CatalogoClient'

export const metadata: Metadata = {
  title: 'Catálogo de Tenis | +200 Modelos en Tendencia',
  description:
    'Explora nuestro catálogo completo de tenis premium. Nike, Adidas, Jordan, New Balance y Puma. +200 modelos en tendencia. Precios desde $650 MXN. Tepito, CDMX.',
  keywords: [
    'catálogo tenis',
    'tenis nike',
    'tenis adidas',
    'tenis jordan',
    'tenis new balance',
    'comprar tenis cdmx',
    'tenis tepito',
  ],
  alternates: {
    canonical: `${SITE_URL}/catalogo`,
  },
  openGraph: {
    title: 'Catálogo de Tenis | Lucca Sneakers - +200 Modelos',
    description:
      'Explora nuestro catálogo completo de tenis premium. Nike, Adidas, Jordan, New Balance y Puma.',
    url: `${SITE_URL}/catalogo`,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Catálogo Lucca Sneakers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Tenis | Lucca Sneakers',
    description: '+200 modelos de tenis premium. Nike, Adidas, Jordan y más.',
    images: ['/images/og-image.png'],
  },
}

export default async function CatalogoPage() {
  const products = await getProducts()
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', url: '/' },
          { name: 'Catálogo', url: '/catalogo' },
        ])}
      />
      <CatalogoClient initialProducts={products} />
    </>
  )
}
