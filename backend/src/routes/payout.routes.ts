import { Router } from 'express'
import { z } from 'zod'
import { requireAuth, requireAdmin, AuthRequest } from '../middleware/auth.middleware'
import { validate } from '../middleware/validation.middleware'
import { payoutService } from '../services/payout.service'

export const payoutRouter = Router()

const executePayoutSchema = z.object({
  depositId: z.string().cuid('ID deposito non valido'),
  currency: z.enum(['USDC', 'USDT']),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Indirizzo wallet non valido'),
})

// POST /payouts/execute — solo admin/appraiser
payoutRouter.post(
  '/execute',
  requireAuth,
  requireAdmin,
  validate(executePayoutSchema),
  async (req: AuthRequest, res) => {
    try {
      const result = await payoutService.executePayout(
        req.body.depositId,
        req.body.walletAddress,
        req.body.currency
      )
      res.json(result)
    } catch (err: unknown) {
      const e = err as Error
      console.error('Errore esecuzione payout:', e.message)

      if (e.message.includes('insufficiente')) {
        return res.status(422).json({ error: e.message })
      }
      if (e.message.includes('non configurato')) {
        return res.status(503).json({ error: 'Servizio blockchain non disponibile' })
      }
      res.status(500).json({ error: 'Errore durante l\'esecuzione del payout' })
    }
  }
)
