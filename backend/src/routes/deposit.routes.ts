import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { z } from 'zod'
import { requireAuth, AuthRequest } from '../middleware/auth.middleware'
import { amlCheck } from '../middleware/aml.middleware'
import { validate } from '../middleware/validation.middleware'
import { depositService } from '../services/deposit.service'

export const depositRouter = Router()

// Configurazione multer per upload foto
const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads', 'deposits')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE_MB || '10') * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|heic/i
    cb(null, allowed.test(path.extname(file.originalname)))
  },
})

const createDepositSchema = z.object({
  type: z.enum(['gold', 'silver', 'watch', 'jewelry', 'gemstone', 'other']),
  description: z.string().min(10, 'Descrizione minima 10 caratteri').max(500),
  estimatedWeight: z.string().transform(Number).pipe(z.number().positive('Peso deve essere positivo')),
  preferredCurrency: z.enum(['USDC', 'USDT']).default('USDC'),
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Indirizzo wallet non valido')
    .optional()
    .or(z.literal('')),
})

// POST /deposits
depositRouter.post(
  '/',
  requireAuth,
  upload.array('photos', 5),
  amlCheck('deposit_create'),
  async (req: AuthRequest, res) => {
    try {
      const result = createDepositSchema.safeParse(req.body)
      if (!result.success) {
        return res.status(400).json({ error: 'Dati non validi', details: result.error.errors })
      }

      const files = (req.files as Express.Multer.File[]) || []
      const photoPaths = files.map((f) => `/uploads/deposits/${f.filename}`)

      const deposit = await depositService.createDeposit(
        req.user!.userId,
        result.data,
        photoPaths
      )
      res.status(201).json(deposit)
    } catch (err) {
      console.error('Errore creazione deposito:', err)
      res.status(500).json({ error: 'Errore durante la creazione del deposito' })
    }
  }
)

// GET /deposits
depositRouter.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const deposits = await depositService.getDeposits(req.user!.userId)
    res.json(deposits)
  } catch (err) {
    console.error('Errore recupero depositi:', err)
    res.status(500).json({ error: 'Errore durante il recupero dei depositi' })
  }
})

// GET /deposits/:id
depositRouter.get('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const deposit = await depositService.getDepositById(req.params.id, req.user!.userId)
    if (!deposit) return res.status(404).json({ error: 'Deposito non trovato' })
    res.json(deposit)
  } catch (err) {
    console.error('Errore recupero deposito:', err)
    res.status(500).json({ error: 'Errore durante il recupero del deposito' })
  }
})

// PATCH /deposits/:id/status
depositRouter.patch(
  '/:id/status',
  requireAuth,
  validate(z.object({ status: z.enum(['PENDING', 'RECEIVED', 'APPRAISED', 'PAID', 'REJECTED']) })),
  async (req: AuthRequest, res) => {
    try {
      const deposit = await depositService.updateStatus(
        req.params.id,
        req.body.status,
        req.user!.userId
      )
      res.json(deposit)
    } catch (err: unknown) {
      const e = err as Error
      if (e.message === 'NOT_FOUND') return res.status(404).json({ error: 'Deposito non trovato' })
      if (e.message === 'UNAUTHORIZED') return res.status(403).json({ error: 'Non autorizzato' })
      res.status(500).json({ error: 'Errore durante l\'aggiornamento dello stato' })
    }
  }
)
