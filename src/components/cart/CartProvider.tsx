'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { getCartCount } from '@/lib/cart-actions'

interface CartContextType {
  cartCount: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  refreshCart: async () => {},
})

export function CartProvider({
  children,
  initialCount = 0,
}: {
  children: React.ReactNode
  initialCount?: number
}) {
  const [cartCount, setCartCount] = useState(initialCount)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const refreshCart = useCallback(async () => {
    const count = await getCartCount()
    setCartCount(count)
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
