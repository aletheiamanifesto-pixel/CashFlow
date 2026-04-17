import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Avvio seed database CashFlow...')

  // Utente admin
  const adminPassword = await bcrypt.hash('Admin123!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cashflow.it' },
    update: {},
    create: {
      email: 'admin@cashflow.it',
      passwordHash: adminPassword,
      walletAddress: '0x742d35Cc6634C0532925a3b8D4C9b8d4C9b8d4C9',
      kycStatus: 'APPROVED',
      role: 'ADMIN',
    },
  })

  // Perito autorizzato
  const appraiserPassword = await bcrypt.hash('Perito123!', 12)
  const appraiser = await prisma.user.upsert({
    where: { email: 'perito@cashflow.it' },
    update: {},
    create: {
      email: 'perito@cashflow.it',
      passwordHash: appraiserPassword,
      walletAddress: '0x853e46Dd7745D1643036b5c5E5caA9e5E0c9e5E0',
      kycStatus: 'APPROVED',
      role: 'APPRAISER',
    },
  })

  // Utente test
  const userPassword = await bcrypt.hash('User123!', 12)
  const testUser = await prisma.user.upsert({
    where: { email: 'mario.rossi@gmail.com' },
    update: {},
    create: {
      email: 'mario.rossi@gmail.com',
      passwordHash: userPassword,
      walletAddress: '0x1234567890123456789012345678901234567890',
      kycStatus: 'APPROVED',
      role: 'USER',
    },
  })

  // Deposito 1 — Bracciale oro periziato
  await prisma.deposit.create({
    data: {
      userId: testUser.id,
      type: 'gold',
      description: 'Bracciale in oro giallo 18kt, circa 15 grammi, nessuna pietra, in ottime condizioni',
      estimatedWeight: 15.5,
      estimatedValue: 1200,
      appraisedValue: 1150,
      status: 'APPRAISED',
      photos: [],
      preferredCurrency: 'USDC',
      notes: 'Perizia completata. Oro 750/1000. Peso reale: 15.2g.',
    },
  })

  // Deposito 2 — Rolex in attesa di perizia
  await prisma.deposit.create({
    data: {
      userId: testUser.id,
      type: 'watch',
      description: 'Rolex Submariner acciaio 116610LN, anno 2018, con scatola originale e garanzia',
      estimatedWeight: 155,
      estimatedValue: 8500,
      status: 'RECEIVED',
      photos: [],
      preferredCurrency: 'USDT',
      notes: 'Ricevuto il 15/01/2026. In attesa di perizia.',
    },
  })

  // Deposito 3 — Pendente (appena prenotato)
  await prisma.deposit.create({
    data: {
      userId: testUser.id,
      type: 'jewelry',
      description: 'Collana con ciondolo in oro bianco 18kt con diamante centrale 0.3ct',
      estimatedWeight: 8,
      estimatedValue: 2200,
      status: 'PENDING',
      photos: [],
      preferredCurrency: 'USDC',
    },
  })

  console.log('✅ Seed completato con successo!')
  console.log('')
  console.log('Credenziali di test:')
  console.log(`  Admin:   admin@cashflow.it     / Admin123!`)
  console.log(`  Perito:  perito@cashflow.it    / Perito123!`)
  console.log(`  Utente:  mario.rossi@gmail.com / User123!`)
  console.log('')
  console.log(`Utenti creati: ${admin.id}, ${appraiser.id}, ${testUser.id}`)
}

main()
  .catch((e) => {
    console.error('❌ Errore seed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
