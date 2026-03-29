import { getCartWithItems } from '@/lib/cart-actions'
import CartClient from '@/components/cart/CartClient'

export const metadata = { title: 'Carrito | Lucca Sneakers' }
export const dynamic = 'force-dynamic'

export default async function CartPage() {
  const cart = await getCartWithItems()
  return <CartClient cart={cart} />
}
