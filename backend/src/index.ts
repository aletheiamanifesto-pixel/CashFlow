import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { authRouter } from './routes/auth.routes'
import { depositRouter } from './routes/deposit.routes'
import { kycRouter } from './routes/kyc.routes'
import { payoutRouter } from './routes/payout.routes'
import { adminRouter } from './routes/admin.routes'
import { priceRouter } from './routes/price.routes'

const app = express()
const PORT = process.env.PORT || 4000

// Sicurezza HTTP headers
app.use(helmet())

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting globale — 100 richieste per 15 minuti
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Troppi tentativi. Riprova tra 15 minuti.' },
})
app.use(limiter)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Serve file statici per gli upload (foto depositi, documenti KYC)
const uploadDir = process.env.UPLOAD_DIR || './uploads'
app.use('/uploads', express.static(path.resolve(uploadDir)))

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    env: process.env.NODE_ENV,
  })
})

// Routes API
app.use('/auth', authRouter)
app.use('/deposits', depositRouter)
app.use('/kyc', kycRouter)
app.use('/payouts', payoutRouter)
app.use('/admin', adminRouter)
app.use('/price', priceRouter)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint non trovato' })
})

// Error handler globale
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Errore server:', err.message)
  res.status(500).json({ error: 'Errore interno del server' })
})

app.listen(PORT, () => {
  console.log(`🚀 CashFlow backend avviato sulla porta ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`)
})

export default app
