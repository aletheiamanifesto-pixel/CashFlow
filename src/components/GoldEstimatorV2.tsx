'use client'

import { useState, useEffect } from 'react'
import { Minus, Plus } from 'lucide-react'
import {
  GOLD_PRICE_PER_GRAM,
  BTC_PRICE_EUR,
  KARAT_PURITIES,
  getGoldFeeRate,
  formatEur,
} from '@/lib/prices'

const KARATS = ['9kt', '14kt', '18kt', '24kt'] as const
const CURRENCIES = ['BTC', 'USDC', 'USDT', 'EUR'] as const

type Karat = typeof KARATS[number]
type Currency = typeof CURRENCIES[number]

export default function GoldEstimatorV2() {
  const [weight, setWeight] = useState(10)
  const [karat, setKarat] = useState<Karat>('18kt')
  const [currency, setCurrency] = useState<Currency>('BTC')
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    const update = () => setLastUpdated(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  const purity = KARAT_PURITIES[karat]
  const pureGold = weight * purity
  const marketValue = pureGold * GOLD_PRICE_PER_GRAM
  const feeRate = getGoldFeeRate(marketValue)
  const feeAmount = marketValue * feeRate
  const netPayout = marketValue - feeAmount

  const formatPayout = () => {
    if (currency === 'BTC') return `≈ ${(netPayout / BTC_PRICE_EUR).toFixed(6)} BTC`
    if (currency === 'EUR') return formatEur(netPayout)
    return `≈ ${netPayout.toFixed(0)} ${currency}`
  }

  const formatPayoutEur = () => {
    if (currency === 'BTC') return `(${formatEur(netPayout)})`
    return ''
  }

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
      {/* Weight input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">Weight</label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0.1}
            step={0.1}
            value={weight}
            onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
            className="w-28 bg-[#0A0A0A] border border-white/10 text-white text-lg font-semibold rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors text-center"
          />
          <span className="text-gray-400 text-sm">grams</span>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setWeight(w => Math.max(0.1, parseFloat((w - 0.1).toFixed(1))))}
              className="w-9 h-9 bg-[#0A0A0A] border border-white/10 rounded-lg flex items-center justify-center hover:border-white/30 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setWeight(w => parseFloat((w + 0.1).toFixed(1)))}
              className="w-9 h-9 bg-[#0A0A0A] border border-white/10 rounded-lg flex items-center justify-center hover:border-white/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Karat selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">Purity</label>
        <div className="flex flex-wrap gap-2">
          {KARATS.map((k) => (
            <button
              key={k}
              onClick={() => setKarat(k)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                karat === k
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {k} ({Math.round(KARAT_PURITIES[k] * 1000)})
            </button>
          ))}
        </div>
      </div>

      {/* Currency selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">Payout in</label>
        <div className="flex flex-wrap gap-2">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                currency === c
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 my-6" />

      {/* Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Pure gold content</span>
          <span className="text-white font-medium">{pureGold.toFixed(2)} g</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Market price (LBMA)</span>
          <span className="text-white font-medium">€{GOLD_PRICE_PER_GRAM.toFixed(2)}/g</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Market value</span>
          <span className="text-white font-medium">{formatEur(marketValue)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">CashFlow fee ({(feeRate * 100).toFixed(1)}%)</span>
          <span className="text-red-400 font-medium">-{formatEur(feeAmount)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mb-6" />

      {/* Payout result */}
      <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-xl p-5 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm font-medium">You receive</span>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#D4AF37]">{formatPayout()}</p>
            {formatPayoutEur() && <p className="text-gray-500 text-sm">{formatPayoutEur()}</p>}
          </div>
        </div>
      </div>

      {/* CTA */}
      <a
        href="#waitlist"
        className="block w-full text-center bg-[#D4AF37] text-black font-bold py-3.5 rounded-lg hover:bg-[#c9a430] transition-colors"
      >
        Get Started — Join Waitlist
      </a>

      {/* Footer note */}
      <p className="text-center text-gray-600 text-xs mt-4">
        Price updates every 60s · LBMA reference{lastUpdated ? ` · Last updated: ${lastUpdated}` : ''}
      </p>
    </div>
  )
}
