export const WHATSAPP_NUMBER = '7353884148'
export const WHATSAPP_URL = 'https://wa.me/527353884148?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20sus%20modelos'
export const getWhatsAppURL = (product?: string) =>
  `https://wa.me/527353884148?text=${encodeURIComponent(
    product ? `Hola, me gustaria informacion sobre el modelo: ${product}` : 'Hola, me gustaria informacion sobre sus modelos'
  )}`

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/reel/DWWs5HUgWhb/?igsh=MXJ2ZGhrcHhlbXlyaA==',
  facebook: 'https://www.facebook.com/share/r/1CMyZKt9Lv/?mibextid=wwXIfr',
  tiktok: 'https://vt.tiktok.com/ZSuK5hbfh/',
  youtube: 'https://youtube.com/shorts/7kRpQbZ8OTM?si=Z-iJUiFFd3bgpzSs',
} as const

export const PRICES = { retail: 650, wholesale: 550 } as const
export const BRANDS = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma'] as const
export type Brand = (typeof BRANDS)[number]
export const CATEGORIES = ['running', 'lifestyle', 'basketball', 'classic'] as const

export const CATEGORY_IMAGES: Record<string, string> = {
  running: '/images/category-running.png',
  classic: '/images/category-retro.png',
  basketball: '/images/category-basketball.png',
  lifestyle: '/images/category-lifestyle.png',
}
export type Category = (typeof CATEGORIES)[number]
export const STATS = {
  modelos: '200+',
  nuevosSemanales: '15-20',
  clientesMayoreo: '500+',
  añosExperiencia: '5+',
} as const
