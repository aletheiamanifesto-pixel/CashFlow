import { Router } from 'express'
import { requireAuth, requireAdmin, AuthRequest } from '../middleware/auth.middleware'
import { depositService } from '../services/deposit.service'
import { blockchainService } from '../services/blockchain.service'

export const adminRouter = Router()

// Tutti gli endpoint admin richiedono autenticazione + ruolo admin
adminRouter.use(requireAuth, requireAdmin)

// GET /admin/deposits — lista tutti i depositi
adminRouter.get('/deposits', async (_req: AuthRequest, res) => {
  try {
    const deposits = await depositService.getAllDeposits()
    res.json(deposits)
  } catch (err) {
    console.error('Errore recupero depositi admin:', err)
    res.status(500).json({ error: 'Errore durante il recupero dei depositi' })
  }
})

// GET /admin/deposits/:id — dettaglio deposito
adminRouter.get('/deposits/:id', async (req: AuthRequest, res) => {
  try {
    const deposit = await depositService.getDepositByIdAdmin(req.params.id)
    if (!deposit) return res.status(404).json({ error: 'Deposito non trovato' })
    res.json(deposit)
  } catch (err) {
    console.error('Errore recupero deposito admin:', err)
    res.status(500).json({ error: 'Errore durante il recupero del deposito' })
  }
})

// POST /admin/approve/:id — approva deposito (PENDING → RECEIVED)
adminRouter.post('/approve/:id', async (req: AuthRequest, res) => {
  try {
    const deposit = await depositService.updateStatus(req.params.id, 'RECEIVED', req.user!.userId)
    res.json({ message: 'Deposito approvato', deposit })
  } catch (err: unknown) {
    const e = err as Error
    if (e.message === 'NOT_FOUND') return res.status(404).json({ error: 'Deposito non trovato' })
    res.status(500).json({ error: 'Errore durante l\'approvazione' })
  }
})

// POST /admin/mint/:id — minta NFT per deposito approvato
adminRouter.post('/mint/:id', async (req: AuthRequest, res) => {
  try {
    const deposit = await depositService.getDepositByIdAdmin(req.params.id)
    if (!deposit) return res.status(404).json({ error: 'Deposito non trovato' })
    if (deposit.status !== 'RECEIVED' && deposit.status !== 'APPRAISED') {
      return res.status(422).json({ error: 'Il deposito deve essere nello stato RECEIVED o APPRAISED per mintare l\'NFT' })
    }
    if (!deposit.user.walletAddress && !req.body.recipientAddress) {
      return res.status(422).json({ error: 'Indirizzo wallet destinatario mancante' })
    }

    const recipientAddress = req.body.recipientAddress || deposit.user.walletAddress

    const result = await blockchainService.mintAsset({
      depositId: deposit.id,
      recipientAddress,
      assetType: deposit.type,
      weightGrams: deposit.estimatedWeight,
      valuationEUR: deposit.appraisedValue || deposit.estimatedValue,
      serialNumber: `CF-${deposit.id.slice(-8).toUpperCase()}`,
      description: deposit.description,
    })

    res.json({ message: 'NFT mintato con successo', ...result })
  } catch (err: unknown) {
    const e = err as Error
    console.error('Errore mint NFT:', e.message)
    if (e.message.includes('non configurato')) {
      return res.status(503).json({ error: 'Servizio blockchain non disponibile' })
    }
    res.status(500).json({ error: 'Errore durante il mint dell\'NFT' })
  }
})

// POST /admin/reject/:id — rifiuta deposito
adminRouter.post('/reject/:id', async (req: AuthRequest, res) => {
  try {
    const deposit = await depositService.updateStatus(req.params.id, 'REJECTED', req.user!.userId)
    res.json({ message: 'Deposito rifiutato', deposit })
  } catch (err: unknown) {
    const e = err as Error
    if (e.message === 'NOT_FOUND') return res.status(404).json({ error: 'Deposito non trovato' })
    res.status(500).json({ error: 'Errore durante il rifiuto' })
  }
})
