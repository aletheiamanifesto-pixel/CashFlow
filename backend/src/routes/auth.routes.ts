import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validation.middleware'
import { authService } from '../services/auth.service'
import { requireAuth, AuthRequest } from '../middleware/auth.middleware'

export const authRouter = Router()

const registerSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(8, 'Password minima 8 caratteri'),
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Indirizzo wallet non valido')
    .optional(),
})

const loginSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(1, 'Password obbligatoria'),
})

// POST /auth/register
authRouter.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const result = await authService.register(req.body)
    res.status(201).json(result)
  } catch (error: unknown) {
    const err = error as Error
    if (err.message === 'EMAIL_EXISTS') {
      return res.status(409).json({ error: 'Email già registrata' })
    }
    console.error('Errore registrazione:', err)
    res.status(500).json({ error: 'Errore durante la registrazione' })
  }
})

// POST /auth/login
authRouter.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const result = await authService.login(req.body)
    res.json(result)
  } catch (error: unknown) {
    const err = error as Error
    if (err.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'Credenziali non valide' })
    }
    console.error('Errore login:', err)
    res.status(500).json({ error: 'Errore durante il login' })
  }
})

// GET /auth/me
authRouter.get('/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = await authService.getProfile(req.user!.userId)
    res.json(user)
  } catch {
    res.status(404).json({ error: 'Utente non trovato' })
  }
})
