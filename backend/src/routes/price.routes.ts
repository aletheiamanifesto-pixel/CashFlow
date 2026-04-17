import { Router } from 'express'
import { pricingService } from '../services/pricing.service'

export const priceRouter = Router()

// Cache semplice in memoria per non sovraccaricare Gold-API
const cache: Record<string, { data: unknown; timestamp: number }> = {}
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minuti

function getCached(key: string) {
  const entry = cache[key]
  if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) return entry.data
  return null
}

function setCache(key: string, data: unknown) {
  cache[key] = { data, timestamp: Date.now() }
}

// GET /price/gold
priceRouter.get('/gold', async (_req, res) => {
  try {
    const cached = getCached('gold')
    if (cached) return res.json(cached)

    const data = await pricingService.getGoldPrice()
    setCache('gold', data)
    res.json(data)
  } catch (err: unknown) {
    const e = err as Error
    console.error('Errore prezzo oro:', e.message)
    res.status(503).json({ error: 'Servizio prezzi temporaneamente non disponibile' })
  }
})

// GET /price/silver
priceRouter.get('/silver', async (_req, res) => {
  try {
    const cached = getCached('silver')
    if (cached) return res.json(cached)

    const data = await pricingService.getSilverPrice()
    setCache('silver', data)
    res.json(data)
  } catch (err: unknown) {
    const e = err as Error
    console.error('Errore prezzo argento:', e.message)
    res.status(503).json({ error: 'Servizio prezzi temporaneamente non disponibile' })
  }
})
