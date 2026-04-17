import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { requireAuth, AuthRequest } from '../middleware/auth.middleware'
import { kycService } from '../services/kyc.service'

export const kycRouter = Router()

// Upload documenti KYC
const kycDir = path.resolve(process.env.UPLOAD_DIR || './uploads', 'kyc')
if (!fs.existsSync(kycDir)) fs.mkdirSync(kycDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, kycDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE_MB || '10') * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf|heic/i
    cb(null, allowed.test(path.extname(file.originalname)))
  },
})

// POST /kyc/submit
kycRouter.post(
  '/submit',
  requireAuth,
  upload.fields([
    { name: 'docFront', maxCount: 1 },
    { name: 'docBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 },
  ]),
  async (req: AuthRequest, res) => {
    try {
      const files = req.files as Record<string, Express.Multer.File[]>

      if (!files.docFront || !files.selfie) {
        return res.status(400).json({
          error: 'Documenti obbligatori mancanti: docFront e selfie sono richiesti',
        })
      }

      const documents = {
        docFront: `/uploads/kyc/${files.docFront[0].filename}`,
        docBack: files.docBack ? `/uploads/kyc/${files.docBack[0].filename}` : undefined,
        selfie: `/uploads/kyc/${files.selfie[0].filename}`,
      }

      const result = await kycService.submitKyc(req.user!.userId, documents)
      res.status(201).json(result)
    } catch (err) {
      console.error('Errore submit KYC:', err)
      res.status(500).json({ error: 'Errore durante l\'invio dei documenti KYC' })
    }
  }
)

// GET /kyc/status
kycRouter.get('/status', requireAuth, async (req: AuthRequest, res) => {
  try {
    const status = await kycService.getKycStatus(req.user!.userId)
    res.json(status)
  } catch (err) {
    console.error('Errore recupero stato KYC:', err)
    res.status(500).json({ error: 'Errore durante il recupero dello stato KYC' })
  }
})
