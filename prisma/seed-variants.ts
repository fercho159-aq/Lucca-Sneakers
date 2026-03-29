import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaNeonHttp } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, { fullResults: false })
const prisma = new PrismaClient({ adapter })

const ALL_SIZES = ['22', '23', '24', '25', '26', '27', '28', '29', '30']

async function main() {
  console.log('Fetching all existing products...')
  const products = await prisma.product.findMany()
  console.log(`Found ${products.length} products`)

  for (const product of products) {
    const sizes = product.sizes.length > 0 ? product.sizes : ALL_SIZES
    // Expand to full range if product only has default subset
    const targetSizes = ALL_SIZES

    for (const size of targetSizes) {
      try {
        await prisma.variant.create({
          data: {
            productId: product.id,
            size,
            stock: 10,
          },
        })
      } catch {
        // Skip duplicates (unique constraint violation)
      }
    }
    console.log(`Created variants for: ${product.name}`)
  }

  console.log('\nSeeding AdminUser...')
  const passwordHash = await bcrypt.hash('lucca2024', 10)
  try {
    await prisma.adminUser.upsert({
      where: { email: 'admin@luccasneakers.com' },
      update: { passwordHash, name: 'Admin Lucca' },
      create: {
        email: 'admin@luccasneakers.com',
        passwordHash,
        name: 'Admin Lucca',
      },
    })
    console.log('AdminUser created/updated: admin@luccasneakers.com')
  } catch (e) {
    console.error('Error creating admin user:', e)
  }

  console.log('\nSeed variants completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
