'use server'

import { cookies } from 'next/headers'
import { prisma } from './prisma'

async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('cart_session')?.value ?? null
}

async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get('cart_session')?.value
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    cookieStore.set('cart_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    })
  }
  return sessionId
}

export async function getOrCreateCart() {
  const sessionId = await getOrCreateSessionId()
  let cart = await prisma.cart.findUnique({ where: { sessionId } })
  if (!cart) {
    cart = await prisma.cart.create({ data: { sessionId } })
  }
  return cart
}

export async function addToCart(variantId: string, quantity: number = 1) {
  const cart = await getOrCreateCart()
  await prisma.cartItem.upsert({
    where: { cartId_variantId: { cartId: cart.id, variantId } },
    update: { quantity: { increment: quantity } },
    create: { cartId: cart.id, variantId, quantity },
  })
  return getCartCount()
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: cartItemId } })
  } else {
    await prisma.cartItem.update({ where: { id: cartItemId }, data: { quantity } })
  }
  return getCartWithItems()
}

export async function removeFromCart(cartItemId: string) {
  await prisma.cartItem.delete({ where: { id: cartItemId } })
  return getCartWithItems()
}

export async function getCartWithItems() {
  const sessionId = await getSessionId()
  if (!sessionId) return null
  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
        include: {
          variant: {
            include: { product: true }
          }
        }
      }
    }
  })
  return cart
}

export async function getCartCount(): Promise<number> {
  const sessionId = await getSessionId()
  if (!sessionId) return 0
  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true }
  })
  if (!cart) return 0
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
}

export async function clearCart() {
  const sessionId = await getSessionId()
  if (!sessionId) return
  const cart = await prisma.cart.findUnique({ where: { sessionId } })
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
  }
}
