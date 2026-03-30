import { redirect } from 'next/navigation'

export const metadata = { title: 'Lucca Sneakers' }

export default function CartPage() {
  redirect('/catalogo')
}
