import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaNeonHttp } from '@prisma/adapter-neon'

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, { fullResults: false })
const prisma = new PrismaClient({ adapter })

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const products = [
  // Nike (8)
  { name: 'Air Max 90 Blanco', brand: 'Nike', category: 'lifestyle', isHot: false, isNew: false },
  { name: 'Air Force 1 Blanco', brand: 'Nike', category: 'lifestyle', isHot: true, isNew: false },
  { name: 'Dunk Low Panda', brand: 'Nike', category: 'lifestyle', isHot: true, isNew: false },
  { name: 'Cortez Rojo Blanco', brand: 'Nike', category: 'classic', isHot: false, isNew: false },
  { name: 'Air Max 97 Silver Bullet', brand: 'Nike', category: 'running', isHot: false, isNew: false },
  { name: 'Air Max Plus Negro', brand: 'Nike', category: 'running', isHot: false, isNew: false },
  { name: 'Dunk Low Green', brand: 'Nike', category: 'lifestyle', isHot: false, isNew: true },
  { name: 'Cortez Beige', brand: 'Nike', category: 'classic', isHot: false, isNew: true },
  // Adidas (7)
  { name: 'Samba OG Verde', brand: 'Adidas', category: 'classic', isHot: true, isNew: false },
  { name: 'Gazelle Navy', brand: 'Adidas', category: 'classic', isHot: false, isNew: false },
  { name: 'Campus 00s Burgundy', brand: 'Adidas', category: 'lifestyle', isHot: false, isNew: false },
  { name: 'Superstar Blanco', brand: 'Adidas', category: 'classic', isHot: false, isNew: false },
  { name: 'Samba OG Blanco', brand: 'Adidas', category: 'classic', isHot: false, isNew: true },
  { name: 'Response CL Silver', brand: 'Adidas', category: 'running', isHot: false, isNew: true },
  { name: 'Handball Spezial', brand: 'Adidas', category: 'classic', isHot: false, isNew: false },
  // Jordan (5)
  { name: 'AJ1 High Chicago', brand: 'Jordan', category: 'basketball', isHot: true, isNew: false },
  { name: 'AJ1 Low Grey', brand: 'Jordan', category: 'basketball', isHot: false, isNew: false },
  { name: 'AJ4 Black Cat', brand: 'Jordan', category: 'basketball', isHot: true, isNew: false },
  { name: 'AJ1 Low Mocha', brand: 'Jordan', category: 'basketball', isHot: false, isNew: true },
  { name: 'AJ1 Low UNC', brand: 'Jordan', category: 'basketball', isHot: false, isNew: true },
  // New Balance (2)
  { name: '530 Blanco Silver', brand: 'New Balance', category: 'running', isHot: true, isNew: false },
  { name: '550 Verde Crema', brand: 'New Balance', category: 'lifestyle', isHot: false, isNew: false },
  // Puma (2)
  { name: 'Suede Classic Navy', brand: 'Puma', category: 'classic', isHot: false, isNew: false },
  { name: 'Palermo Cream', brand: 'Puma', category: 'lifestyle', isHot: false, isNew: false },
]

const testimonials = [
  {
    name: 'Carlos Mendoza',
    text: 'Llevé mis Air Force 1 al trabajo y todos me preguntaron dónde los compré. Calidad increíble por el precio.',
    type: 'retail',
  },
  {
    name: 'María Fernanda López',
    text: 'Ya van 3 pares que le compro a Lucca. Siempre puntuales y con los modelos más nuevos.',
    type: 'retail',
  },
  {
    name: 'Roberto Jiménez',
    text: 'Los Samba que compré se ven idénticos a los originales. Mi novia no lo podía creer.',
    type: 'retail',
  },
  {
    name: 'Diana Herrera',
    text: 'Empecé comprando 12 pares para revender en mi local. Ya llevo 6 meses y es mi mejor proveedor.',
    type: 'mayoreo',
  },
  {
    name: 'Luis Ángel Torres',
    text: 'Vendo tenis por Instagram y Lucca me surte cada semana. El margen de ganancia es buenísimo.',
    type: 'mayoreo',
  },
  {
    name: 'Guadalupe Ramírez',
    text: 'Tengo mi tiendita en Puebla y gracias a Lucca puedo ofrecer modelos en tendencia a buen precio.',
    type: 'mayoreo',
  },
]

const faqs = [
  {
    question: '¿Cuál es el pedido mínimo para mayoreo?',
    answer: 'El pedido mínimo es de 6 pares para obtener el precio de mayoreo de $550 MXN por par. Puedes mezclar modelos y tallas.',
  },
  {
    question: '¿Cómo hago mi primer pedido?',
    answer: 'Escríbenos por WhatsApp, te enviamos el catálogo actualizado con fotos. Eliges tus modelos, tallas y cantidad, y te damos el total. ¡Así de fácil!',
  },
  {
    question: '¿Hacen envíos a toda la República?',
    answer: 'Sí, enviamos a todo México por paquetería. El costo de envío depende de la cantidad de pares y tu ubicación. También puedes recoger directamente en Tepito.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencia bancaria, depósito en OXXO, y efectivo si recoges en tienda. Para mayoreo, el pago es por adelantado.',
  },
  {
    question: '¿Cada cuándo llegan modelos nuevos?',
    answer: 'Recibimos entre 15 y 20 modelos nuevos cada semana. Síguenos en redes sociales para ver las novedades antes que nadie.',
  },
  {
    question: '¿Puedo elegir las tallas de mi pedido?',
    answer: '¡Claro! Tú eliges los modelos y las tallas exactas que necesitas. Manejamos tallas de la 25 a la 30.',
  },
  {
    question: '¿Tienen garantía los tenis?',
    answer: 'Todos nuestros tenis pasan por control de calidad. Si recibes un par con algún defecto de fábrica, te lo cambiamos sin costo.',
  },
  {
    question: '¿Ofrecen crédito para clientes frecuentes?',
    answer: 'Sí, después de tu tercer pedido podemos ofrecerte facilidades de pago. Pregúntanos por WhatsApp para más detalles.',
  },
]

async function main() {
  console.log('Clearing existing data...')
  await prisma.fAQ.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.product.deleteMany()

  console.log('Seeding products...')
  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    // Exactly the last 6 products (index 18-23) should have isNew: true
    const isNew = i >= 18
    await prisma.product.create({
      data: {
        name: p.name,
        slug: toSlug(p.name),
        brand: p.brand,
        category: p.category,
        priceRetail: 650,
        priceWholesale: 550,
        sizes: ['25', '26', '27', '28', '29', '30'],
        image: null,
        isNew,
        isHot: p.isHot,
        isActive: true,
        order: i,
      },
    })
  }
  console.log(`Created ${products.length} products`)

  console.log('Seeding testimonials...')
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: {
        name: t.name,
        text: t.text,
        type: t.type,
        isActive: true,
      },
    })
  }
  console.log(`Created ${testimonials.length} testimonials`)

  console.log('Seeding FAQs...')
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i]
    await prisma.fAQ.create({
      data: {
        question: f.question,
        answer: f.answer,
        order: i,
        isActive: true,
      },
    })
  }
  console.log(`Created ${faqs.length} FAQs`)

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
