'use client'

import { useEffect, useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, Footprints, ShoppingBag, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartProvider'
import { getCartWithItems, updateCartItem, removeFromCart } from '@/lib/cart-actions'
import { generateCartOrderURL } from '@/lib/whatsapp'
import { formatPrice } from '@/lib/utils'

interface CartItem {
  id: string
  quantity: number
  variant: {
    id: string
    size: string
    product: {
      id: string
      name: string
      brand: string
      image: string | null
      priceRetail: number
    }
  }
}

interface Cart {
  id: string
  items: CartItem[]
}

export default function CartDrawer() {
  const { isCartOpen, closeCart, refreshCart } = useCart()
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (isCartOpen) {
      setLoading(true)
      getCartWithItems()
        .then((data) => setCart(data as Cart | null))
        .finally(() => setLoading(false))
    }
  }, [isCartOpen])

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    startTransition(async () => {
      if (newQuantity <= 0) {
        await removeFromCart(itemId)
      } else {
        await updateCartItem(itemId, newQuantity)
      }
      const updated = await getCartWithItems()
      setCart(updated as Cart | null)
      await refreshCart()
    })
  }

  const handleRemove = (itemId: string) => {
    startTransition(async () => {
      await removeFromCart(itemId)
      const updated = await getCartWithItems()
      setCart(updated as Cart | null)
      await refreshCart()
    })
  }

  const items = cart?.items ?? []
  const total = items.reduce(
    (sum, item) => sum + item.variant.product.priceRetail * item.quantity,
    0
  )

  const whatsappItems = items.map((item) => ({
    name: item.variant.product.name,
    size: item.variant.size,
    quantity: item.quantity,
    price: item.variant.product.priceRetail,
  }))

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[#1A1A1A]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-wider text-white">
                TU CARRITO
              </h2>
              <button
                onClick={closeCart}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="h-16 w-16 text-white/10" />
                  <p className="mt-4 text-gray-400">Tu carrito esta vacio</p>
                  <Link
                    href="/catalogo"
                    onClick={closeCart}
                    className="mt-4 text-sm font-medium text-[var(--color-gold)] hover:underline"
                  >
                    Ver catalogo
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-lg bg-[#0A0A0A] p-3"
                    >
                      {/* Image placeholder */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#2A2A2A]">
                        {item.variant.product.image ? (
                          <img
                            src={item.variant.product.image}
                            alt={item.variant.product.name}
                            className="h-full w-full rounded-lg object-cover"
                          />
                        ) : (
                          <Footprints className="h-6 w-6 text-white/20" />
                        )}
                      </div>

                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium text-white truncate">
                          {item.variant.product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.variant.product.brand} &middot; Talla {item.variant.size}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={isPending}
                              className="flex h-7 w-7 items-center justify-center rounded bg-[#2A2A2A] text-white transition-colors hover:bg-[#3A3A3A] cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={isPending}
                              className="flex h-7 w-7 items-center justify-center rounded bg-[#2A2A2A] text-white transition-colors hover:bg-[#3A3A3A] cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white">
                              {formatPrice(item.variant.product.priceRetail * item.quantity)}
                            </span>
                            <button
                              onClick={() => handleRemove(item.id)}
                              disabled={isPending}
                              className="text-gray-500 transition-colors hover:text-[#EF4444] cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/5 px-6 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-gray-400">Total</span>
                  <span className="text-xl font-bold text-white">{formatPrice(total)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/carrito"
                    onClick={closeCart}
                    className="flex items-center justify-center rounded-lg border border-white px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
                  >
                    VER CARRITO
                  </Link>
                  <a
                    href={generateCartOrderURL(whatsappItems)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-bold text-white transition-colors hover:brightness-110"
                  >
                    PEDIR POR WHATSAPP
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
