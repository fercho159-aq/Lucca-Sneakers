import type { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts } from '@/lib/actions'
import { notFound } from 'next/navigation'
import { SITE_URL, getProductJsonLd, getBreadcrumbJsonLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import ProductDetail from '@/components/product/ProductDetail'
import RelatedProducts from '@/components/product/RelatedProducts'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Producto no encontrado' }
  const title = `${product.name} de ${product.brand} | Lucca Sneakers`
  const description = `Compra ${product.name} de ${product.brand} en Lucca Sneakers, Tepito CDMX. Tallas disponibles: ${product.sizes?.join(', ') || 'Consultar'}. Precio: $${product.priceRetail} MXN. Consulta disponibilidad por WhatsApp.`
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/catalogo/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/catalogo/${slug}`,
      type: 'website',
      images: product.image
        ? [{ url: product.image, width: 800, height: 800, alt: product.name }]
        : [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Lucca Sneakers' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Lucca Sneakers`,
      description: `${product.name} de ${product.brand} — Desde $${product.priceRetail} MXN. Tepito, CDMX.`,
      images: product.image ? [product.image] : ['/images/og-image.png'],
    },
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
      <JsonLd
        data={getProductJsonLd({
          name: product.name,
          brand: product.brand,
          slug: product.slug,
          image: product.image,
          priceRetail: product.priceRetail,
          category: product.category,
          sizes: product.sizes || [],
        })}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', url: '/' },
          { name: 'Catálogo', url: '/catalogo' },
          { name: product.name, url: `/catalogo/${product.slug}` },
        ])}
      />
      <ProductDetail product={product} />
      <RelatedProducts products={related} />
    </div>
  )
}
