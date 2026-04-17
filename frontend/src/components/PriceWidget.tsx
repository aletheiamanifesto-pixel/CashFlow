'use client'

import { useState, useEffect } from 'react'
import { priceApi } from '@/lib/api'

interface PriceData {
  price: number
  currency: string
  unit: string
  timestamp: string
  change24h?: number
}

export default function PriceWidget() {
  const [goldPrice, setGoldPrice] = useState<PriceData | null>(null)
  const [silverPrice, setSilverPrice] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchPrices = async () => {
    try {
      const [goldRes, silverRes] = await Promise.all([
        priceApi.gold(),
        priceApi.silver(),
      ])
      setGoldPrice(goldRes.data)
      setSilverPrice(silverRes.data)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Errore caricamento prezzi:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
    // Aggiorna prezzi ogni 5 minuti
    const interval = setInterval(fetchPrices, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-dark-card border border-white/10 rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-32 mb-4" />
        <div className="space-y-3">
          <div className="h-5 bg-white/10 rounded w-full" />
          <div className="h-5 bg-white/10 rounded w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-card border border-gold/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
          Prezzi in Tempo Reale
        </h3>
        {lastUpdate && (
          <button
            onClick={fetchPrices}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
            title="Aggiorna prezzi"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {lastUpdate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {goldPrice && (
          <PriceLine
            label="🥇 Oro (troy oz)"
            price={goldPrice.price}
            currency={goldPrice.currency}
            change={goldPrice.change24h}
          />
        )}
        {silverPrice && (
          <PriceLine
            label="🥈 Argento (troy oz)"
            price={silverPrice.price}
            currency={silverPrice.currency}
            change={silverPrice.change24h}
          />
        )}
      </div>

      <p className="text-xs text-gray-600 mt-3">
        Fonte: Gold-API · Prezzi indicativi LBMA
      </p>
    </div>
  )
}

function PriceLine({
  label,
  price,
  currency,
  change,
}: {
  label: string
  price: number
  currency: string
  change?: number
}) {
  const isPositive = change !== undefined && change >= 0

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-white">
          {currency === 'EUR' ? '€' : '$'}
          {price.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        {change !== undefined && (
          <span className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}
            {change.toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  )
}
