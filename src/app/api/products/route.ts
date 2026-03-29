import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const brand = request.nextUrl.searchParams.get('brand')
  const all = request.nextUrl.searchParams.get('all')

  const products = await prisma.product.findMany({
    where: {
      ...(all !== 'true' ? { isActive: true } : {}),
      ...(brand && brand !== 'all' ? { brand } : {}),
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(products)
}
