import { getProductBySlug, getRelatedProducts } from '@/lib/actions'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/product/ProductDetail'
import RelatedProducts from '@/components/product/RelatedProducts'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Producto no encontrado' }
  return {
    title: `${product.name} | Lucca Sneakers`,
    description: `${product.name} de ${product.brand} — Lucca Sneakers, Tepito CDMX. Consulta disponibilidad por WhatsApp.`,
  }
}

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  const related = await getRelatedProducts(product.id, product.category)
  return (
    <div className="min-h-screen">
      <ProductDetail product={product} />
      <RelatedProducts products={related} />
    </div>
  )
}
