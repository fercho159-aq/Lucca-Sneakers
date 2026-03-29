'use client'

import { useTransition } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Minus, Plus, X, Footprints, Loader2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateCartItem, removeFromCart } from '@/lib/cart-actions'
import { generateCartOrderURL } from '@/lib/whatsapp'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/components/cart/CartProvider'
import Button from '@/components/ui/Button'

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
      slug: string
      image: string | null
      priceRetail: number
    }
  }
}

interface Cart {
  id: string
  items: CartItem[]
}

interface CartClientProps {
  cart: Cart | null
}

export default function CartClient({ cart }: CartClientProps) {
  const [isPending, startTransition] = useTransition()
  const { refreshCart } = useCart()
  const router = useRouter()

  const items = cart?.items ?? []
  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.product.priceRetail * item.quantity,
    0
  )

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    startTransition(async () => {
      if (newQuantity <= 0) {
        await removeFromCart(itemId)
      } else {
        await updateCartItem(itemId, newQuantity)
      }
      await refreshCart()
      router.refresh()
    })
  }

  const handleRemove = (itemId: string) => {
    startTransition(async () => {
      await removeFromCart(itemId)
      await refreshCart()
      router.refresh()
    })
  }

  const whatsappItems = items.map((item) => ({
    name: item.variant.product.name,
    size: item.variant.size,
    quantity: item.quantity,
    price: item.variant.product.priceRetail,
  }))

  if (!cart || items.length === 0) {
    return (
      <section className="pt-28 pb-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag className="h-24 w-24 text-white/10" />
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl tracking-wider text-white">
              TU CARRITO ESTA VACIO
            </h1>
            <p className="mt-2 text-gray-400">
              Agrega productos desde nuestro catalogo
            </p>
            <div className="mt-8">
              <Button variant="primary" href="/catalogo">
                VER CATALOGO
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-28 pb-20 px-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 font-[family-name:var(--font-display)] text-3xl tracking-wider text-white">
          TU CARRITO
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2">
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  className="flex gap-4 rounded-xl bg-[#1A1A1A] border border-white/5 p-4"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Image */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-[#2A2A2A] overflow-hidden">
                    {item.variant.product.image ? (
                      <img
                        src={item.variant.product.image}
                        alt={item.variant.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Footprints className="h-8 w-8 text-white/20" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/catalogo/${item.variant.product.slug}`}
                          className="font-medium text-white hover:text-[var(--color-gold)] transition-colors"
                        >
                          {item.variant.product.name}
                        </Link>
                        <p className="text-sm text-gray-400">
                          {item.variant.product.brand} &middot; Talla {item.variant.size}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={isPending}
                        className="rounded-lg p-1 text-gray-500 transition-colors hover:text-[#EF4444] cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={isPending}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A2A2A] text-white transition-colors hover:bg-[#3A3A3A] cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={isPending}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A2A2A] text-white transition-colors hover:bg-[#3A3A3A] cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-lg font-bold text-white">
                        {formatPrice(item.variant.product.priceRetail * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-xl bg-[#1A1A1A] border border-white/5 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-wider text-white">
                RESUMEN
              </h2>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Envio</span>
                  <span className="text-gray-400 text-xs">A cotizar por WhatsApp</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Total</span>
                  <span className="text-xl font-bold text-white">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={generateCartOrderURL(whatsappItems)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-bold text-white transition-colors hover:brightness-110"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  COMPLETAR PEDIDO POR WHATSAPP
                </a>
                <Link
                  href="/catalogo"
                  className="text-center text-sm text-gray-400 transition-colors hover:text-[var(--color-gold)]"
                >
                  Seguir comprando
                </Link>
              </div>

              {isPending && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Actualizando...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
