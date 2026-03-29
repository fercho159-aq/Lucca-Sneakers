'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProducts(brand?: string) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      ...(brand && brand !== 'all' ? { brand } : {}),
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      isActive: true,
      OR: [{ isHot: true }, { isNew: true }],
    },
    orderBy: { order: 'asc' },
    take: 8,
  })
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getFAQs() {
  return prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })
}

export async function createProduct(data: {
  name: string
  brand: string
  category: string
  image?: string
  sizes?: string[]
  isNew?: boolean
  isHot?: boolean
}) {
  const slug = data.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      brand: data.brand,
      category: data.category,
      image: data.image ?? null,
      sizes: data.sizes ?? ['25', '26', '27', '28', '29', '30'],
      isNew: data.isNew ?? false,
      isHot: data.isHot ?? false,
    },
  })

  revalidatePath('/admin')
  revalidatePath('/catalogo')

  return product
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string
    brand: string
    category: string
    image: string | null
    sizes: string[]
    isNew: boolean
    isHot: boolean
    isActive: boolean
    order: number
    priceRetail: number
    priceWholesale: number
  }>
) {
  const product = await prisma.product.update({
    where: { id },
    data,
  })

  revalidatePath('/admin')
  revalidatePath('/catalogo')

  return product
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.update({
    where: { id },
    data: { isActive: false },
  })

  revalidatePath('/admin')
  revalidatePath('/catalogo')

  return product
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { variants: { orderBy: { size: 'asc' } } }
  })
}

export async function getRelatedProducts(productId: string, category: string, limit = 4) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      category,
      id: { not: productId },
    },
    take: limit,
    orderBy: { order: 'asc' },
  })
}
