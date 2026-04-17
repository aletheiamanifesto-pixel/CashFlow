'use client'

import { useState } from 'react'
import {
  WATCH_PRICES,
  WATCH_CONDITION_MULTIPLIERS,
  WATCH_PAPERS_MULTIPLIERS,
  WATCH_FEE_RATE,
  BTC_PRICE_EUR,
  formatEur,
} from '@/lib/prices'

const BRANDS = Object.keys(WATCH_PRICES)
const CONDITIONS = Object.keys(WATCH_CONDITION_MULTIPLIERS)
const PAPERS = Object.keys(WATCH_PAPERS_MULTIPLIERS)
const CURRENCIES = ['BTC', 'USDC', 'USDT', 'EUR'] as const
type Currency = typeof CURRENCIES[number]

export default function WatchEstimator() {
  const [brand, setBrand] = useState(BRANDS[0])
  const [model, setModel] = useState(Object.keys(WATCH_PRICES[BRANDS[0]])[0])
  const [condition, setCondition] = useState(CONDITIONS[0])
  const [papers, setPapers] = useState(PAPERS[0])
  const [currency, setCurrency] = useState<Currency>('BTC')

  const handleBrandChange = (b: string) => {
    setBrand(b)
    setModel(Object.keys(WATCH_PRICES[b])[0])
  }

  const basePrice = WATCH_PRICES[brand]?.[model] ?? 0
  const condMult = WATCH_CONDITION_MULTIPLIERS[condition]
  const papersMult = WATCH_PAPERS_MULTIPLIERS[papers]
  const adjustedValue = basePrice * condMult * papersMult
  const feeAmount = adjustedValue * WATCH_FEE_RATE
  const netPayout = adjustedValue - feeAmount

  const formatPayout = () => {
    if (currency === 'BTC') return `≈ ${(netPayout / BTC_PRICE_EUR).toFixed(6)} BTC`
    if (currency === 'EUR') return formatEur(netPayout)
    return `≈ ${netPayout.toFixed(0)} ${currency}`
  }

  const formatPayoutEur = () => {
    if (currency === 'BTC') return `(${formatEur(netPayout)})`
    return ''
  }

  const models = Object.keys(WATCH_PRICES[brand] ?? {})

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
      {/* Brand selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">Brand</label>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => handleBrandChange(b)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                brand === b
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Model selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">Model</label>
        <div className="flex flex-wrap gap-2">
          {models.map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                model === m
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Condition selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-3">Condition</label>
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((c) => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                condition === c
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Box & Papers */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">Box & Papers</label>
        <div className="flex flex-wrap gap-2">
          {PAPERS.map((p) => (
            <button
              key={p}
              onClick={() => setPapers(p)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                papers === p
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {p}
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
          <span className="text-gray-400">Estimated market value</span>
          <span className="text-white font-medium">{formatEur(basePrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Condition ({condition})</span>
          <span className="text-white font-medium">×{condMult.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Box & Papers ({papers})</span>
          <span className="text-white font-medium">×{papersMult.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Adjusted value</span>
          <span className="text-white font-medium">{formatEur(adjustedValue)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">CashFlow fee ({(WATCH_FEE_RATE * 100).toFixed(0)}%)</span>
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
        Get a Detailed Quote
      </a>

      <p className="text-center text-gray-600 text-xs mt-4">
        * Estimate only. Final price determined after expert authentication.
      </p>
    </div>
  )
}
