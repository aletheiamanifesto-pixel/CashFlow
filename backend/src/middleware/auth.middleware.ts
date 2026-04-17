import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: { userId: string; role: string }
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_not_for_production'

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token di autenticazione mancante' })
    return
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string }
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token non valido o scaduto' })
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Non autenticato' })
    return
  }
  if (req.user.role !== 'ADMIN' && req.user.role !== 'APPRAISER') {
    res.status(403).json({ error: 'Accesso non autorizzato. Richiesti privilegi admin.' })
    return
  }
  next()
}
