const WA_NUMBER = '527353884148'

export function generateProductInquiryURL(productName: string, size: string): string {
  const message = `Hola! Me interesa el *${productName}* en talla *${size}*. ¿Tienen disponible? 🔥`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export interface CartItemForWhatsApp {
  name: string
  size: string
  quantity: number
  price: number
}

export function generateCartOrderURL(items: CartItemForWhatsApp[], customerName?: string, city?: string): string {
  let message = `🔥 *Pedido Lucca Sneakers* 🔥\n━━━━━━━━━━━━━━━\n`
  let total = 0
  items.forEach(item => {
    const price = Number(item.price)
    message += `${item.quantity}× ${item.name} (Talla ${item.size}) — $${price}\n`
    total += price * item.quantity
  })
  message += `━━━━━━━━━━━━━━━\n💰 Total aprox: $${total.toLocaleString()} MXN\n`
  if (customerName) message += `👤 Nombre: ${customerName}\n`
  if (city) message += `📍 Envío a: ${city}\n`
  message += `\n¿Me confirman disponibilidad? 🙏`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function generateWholesaleInquiryURL(name: string, quantity?: number): string {
  let message = `👑 *Consulta de Mayoreo — Lucca Sneakers*\n\nHola, me interesa comprar al mayoreo.\n`
  if (quantity) message += `Estimo un pedido de aprox *${quantity} pares*.\n`
  message += `Mi nombre es ${name}.\n\n¿Me pueden dar más información sobre precios y modelos disponibles?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
