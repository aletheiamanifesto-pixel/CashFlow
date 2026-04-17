import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from './auth.middleware'

const prisma = new PrismaClient()

// Soglie AML (D.Lgs. 231/2007)
const THRESHOLD_ENHANCED = parseInt(process.env.AML_THRESHOLD_ENHANCED || '5000')   // Verifica rafforzata
const THRESHOLD_REPORT = parseInt(process.env.AML_THRESHOLD_REPORT || '10000')      // Segnalazione UIF obbligatoria

export function amlCheck(operationType: string) {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const amount = parseFloat(req.body?.estimatedValue || req.body?.amount || '0')
    const userId = req.user?.userId

    let flagged = false
    let flagReason: string | null = null

    // Verifica soglie antiriciclaggio
    if (amount >= THRESHOLD_REPORT) {
      flagged = true
      flagReason = `Importo €${amount} supera soglia UIF €${THRESHOLD_REPORT} — segnalazione obbligatoria`
      console.warn(`[AML] ⚠️  SEGNALAZIONE UIF RICHIESTA — utente: ${userId}, importo: €${amount}`)
    } else if (amount >= THRESHOLD_ENHANCED) {
      flagged = true
      flagReason = `Importo €${amount} supera soglia verifica rafforzata €${THRESHOLD_ENHANCED}`
      console.warn(`[AML] ⚠️  Verifica rafforzata richiesta — utente: ${userId}, importo: €${amount}`)
    }

    try {
      // Registra operazione nel log AML (obbligatorio per compliance)
      await prisma.amlLog.create({
        data: {
          userId: userId || null,
          operationType,
          amount: amount || null,
          flagged,
          flagReason,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
          metadata: { body: req.body, path: req.path },
        },
      })
    } catch (err) {
      console.error('[AML] Errore salvataggio log:', err)
      // Non bloccare l'operazione per errori di logging
    }

    // Aggiungi header di warning se segnalato
    if (flagged) {
      res.setHeader('X-AML-Flagged', 'true')
      if (flagReason) res.setHeader('X-AML-Reason', flagReason)
    }

    next()
  }
}
