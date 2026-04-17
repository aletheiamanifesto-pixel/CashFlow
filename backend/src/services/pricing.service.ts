import axios from 'axios'

interface PriceResult {
  price: number
  currency: string
  unit: string
  timestamp: string
  change24h?: number
}

// Cache per evitare troppe chiamate all'API
const priceCache: Record<string, { data: PriceResult; timestamp: number }> = {}
const CACHE_TTL = 5 * 60 * 1000 // 5 minuti

export const pricingService = {
  async getGoldPrice(): Promise<PriceResult> {
    return this.getMetalPrice('XAU', 'Oro')
  },

  async getSilverPrice(): Promise<PriceResult> {
    return this.getMetalPrice('XAG', 'Argento')
  },

  async getMetalPrice(symbol: string, name: string): Promise<PriceResult> {
    const cacheKey = symbol
    const cached = priceCache[cacheKey]

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data
    }

    const apiKey = process.env.GOLD_API_KEY
    const baseUrl = process.env.GOLD_API_URL || 'https://www.goldapi.io/api'

    // Dati demo quando API key non configurata (sviluppo locale)
    if (!apiKey || apiKey === 'your_gold_api_key_here') {
      const demo = symbol === 'XAU'
        ? { price: 2350.50, change24h: 0.42 }
        : { price: 29.85, change24h: -0.18 }

      return {
        price: demo.price,
        currency: 'USD',
        unit: 'troy oz',
        timestamp: new Date().toISOString(),
        change24h: demo.change24h,
      }
    }

    try {
      const response = await axios.get(`${baseUrl}/${symbol}/EUR`, {
        headers: { 'x-access-token': apiKey },
        timeout: 5000,
      })

      const data = response.data
      const result: PriceResult = {
        price: data.price,
        currency: data.currency || 'EUR',
        unit: 'troy oz',
        timestamp: new Date(data.timestamp * 1000).toISOString(),
        change24h: data.ch_percent,
      }

      priceCache[cacheKey] = { data: result, timestamp: Date.now() }
      return result
    } catch (error) {
      console.error(`Errore recupero prezzo ${name}:`, error)
      throw new Error(`Impossibile recuperare il prezzo del ${name}`)
    }
  },

  // Converte prezzo troy oz in prezzo per grammo
  perGram(pricePerOz: number): number {
    return pricePerOz / 31.1035 // 1 troy oz = 31.1035 grammi
  },
}
