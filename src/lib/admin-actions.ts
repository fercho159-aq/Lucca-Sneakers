'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'

export async function getAdminDashboardStats() {
  const [totalProducts, newProducts, hotProducts, pendingOrders, newInquiries] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.product.count({ where: { isActive: true, isNew: true } }),
    prisma.product.count({ where: { isActive: true, isHot: true } }),
    prisma.order.count({ where: { status: 'pending' } }),
    prisma.wholesaleInquiry.count({ where: { status: 'new' } }),
  ])
  return { totalProducts, newProducts, hotProducts, pendingOrders, newInquiries }
}

export async function getAllOrders(page = 1, limit = 20) {
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { items: { include: { variant: { include: { product: true } } } } }
    }),
    prisma.order.count()
  ])
  return { orders, total, pages: Math.ceil(total / limit) }
}

export async function updateOrderStatus(orderId: string, status: string) {
  await prisma.order.update({ where: { id: orderId }, data: { status } })
  revalidatePath('/admin')
}

export async function getWholesaleInquiries(page = 1, limit = 20) {
  const [inquiries, total] = await Promise.all([
    prisma.wholesaleInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.wholesaleInquiry.count()
  ])
  return { inquiries, total, pages: Math.ceil(total / limit) }
}

export async function updateInquiryStatus(id: string, status: string) {
  await prisma.wholesaleInquiry.update({ where: { id }, data: { status } })
  revalidatePath('/admin')
}

export async function batchResetNew() {
  await prisma.product.updateMany({ where: { isNew: true }, data: { isNew: false } })
  revalidatePath('/admin')
  revalidatePath('/catalogo')
}

export async function batchSetNew(productIds: string[]) {
  await prisma.product.updateMany({ where: { id: { in: productIds } }, data: { isNew: true } })
  revalidatePath('/admin')
  revalidatePath('/catalogo')
}
