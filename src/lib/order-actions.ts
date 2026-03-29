'use server'

import { prisma } from './prisma'
import { clearCart, getCartWithItems } from './cart-actions'

function generateOrderNumber(): string {
  const prefix = 'LS'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export async function createOrderFromCart(customerData: {
  customerName: string
  customerPhone: string
  customerEmail?: string
  shippingAddress?: string
  shippingCity?: string
  shippingState?: string
  shippingZip?: string
  orderType?: string
  notes?: string
}) {
  const cart = await getCartWithItems()
  if (!cart || cart.items.length === 0) throw new Error('Carrito vacío')

  const subtotal = cart.items.reduce((sum, item) => {
    const price = customerData.orderType === 'wholesale'
      ? item.variant.product.priceWholesale
      : item.variant.product.priceRetail
    return sum + price * item.quantity
  }, 0)

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      ...customerData,
      orderType: customerData.orderType || 'retail',
      subtotal,
      shipping: 0,
      total: subtotal,
      items: {
        create: cart.items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: customerData.orderType === 'wholesale'
            ? item.variant.product.priceWholesale
            : item.variant.product.priceRetail,
        }))
      }
    },
    include: { items: { include: { variant: { include: { product: true } } } } }
  })

  await clearCart()
  return order
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: { items: { include: { variant: { include: { product: true } } } } }
  })
}
