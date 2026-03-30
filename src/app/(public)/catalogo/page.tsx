export const dynamic = 'force-dynamic'

import { getProducts } from '@/lib/actions'
import CatalogoClient from '@/components/catalogo/CatalogoClient'

export const metadata = {
  title: 'Modelos | Lucca Sneakers - +200 Modelos en Tendencia',
  description:
    'Explora nuestros modelos de tenis premium. Nike, Adidas, Jordan, New Balance y más. Tepito, CDMX.',
}

export default async function CatalogoPage() {
  const products = await getProducts()
  return <CatalogoClient initialProducts={products} />
}
