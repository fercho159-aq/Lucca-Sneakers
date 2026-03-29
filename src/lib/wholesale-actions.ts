'use server'

import { prisma } from './prisma'

export async function submitWholesaleInquiry(data: {
  name: string
  phone: string
  email?: string
  businessName?: string
  business?: string
  city?: string
  message: string
  estimatedPairs?: number
  quantity?: number
}) {
  return prisma.wholesaleInquiry.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      business: data.businessName || data.business,
      city: data.city,
      message: data.message,
      quantity: data.estimatedPairs || data.quantity,
    },
  })
}
