// Must use require() for env loading — before any imports
const path = require('path')
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') })

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Prisma 7: no datasource option in constructor — URL comes from prisma.config.ts
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const adminEmail = process.env.ADMIN_EMAIL || 'aspirelite052@gmail.com'
  const adminPassword = 'Admin@JB2026!'

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    })
    console.log(`✅ Admin created: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
    console.log(`   ⚠️  Change this after first login!`)
  } else {
    console.log(`ℹ️  Admin already exists: ${adminEmail}`)
  }

  const categories = [
    { name: 'Fasteners',             slug: 'fasteners',             sortOrder: 1 },
    { name: 'Power Tools',           slug: 'power-tools',           sortOrder: 2 },
    { name: 'Safety Equipment',      slug: 'safety-equipment',      sortOrder: 3 },
    { name: 'Hydraulics',            slug: 'hydraulics',            sortOrder: 4 },
    { name: 'Electrical Supplies',   slug: 'electrical-supplies',   sortOrder: 5 },
    { name: 'Mechanical Components', slug: 'mechanical-components', sortOrder: 6 },
    { name: 'Engineering Tools',     slug: 'engineering-tools',     sortOrder: 7 },
    { name: 'Workshop Equipment',    slug: 'workshop-equipment',    sortOrder: 8 },
    { name: 'Consumables',           slug: 'consumables',           sortOrder: 9 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name:      cat.name,
        slug:      cat.slug,
        sortOrder: cat.sortOrder,
        isActive:  true,
      },
    })
  }
  console.log(`✅ ${categories.length} categories seeded`)

  const existingBanner = await prisma.banner.findFirst({
    where: { position: 'hero' },
  })
  if (!existingBanner) {
    await prisma.banner.create({
      data: {
        title:    'Industrial Supplies for Malta & Beyond',
        subtitle: 'Premium marine and industrial products, delivered fast',
        imageUrl: '/images/hero-banner.jpg',
        linkUrl:  '/products',
        linkText: 'Browse catalogue',
        position: 'hero',
        isActive: true,
        sortOrder: 1,
      },
    })
    console.log('✅ Sample banner created')
  }

  console.log('\n🎉 Seed complete!')
  console.log('─────────────────────────────')
  console.log(`Admin:    ${adminEmail}`)
  console.log(`Password: ${adminPassword}`)
  console.log('─────────────────────────────')
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
