'use client'

import { useState } from 'react'

const MATERIALS = [
  { label: 'Gold 24kt', value: 'gold_24', pricePerGram: 85, purity: 1.0 },
  { label: 'Gold 18kt', value: 'gold_18', pricePerGram: 63.75, purity: 0.75 },
  { label: 'Gold 14kt', value: 'gold_14', pricePerGram: 49.58, purity: 0.583 },
  { label: 'Gold 9kt', value: 'gold_9', pricePerGram: 31.88, purity: 0.375 },
  { label: 'Silver 925', value: 'silver', pricePerGram: 0.85, purity: 0.925 },
  { label: 'Platinum 950', value: 'platinum', pricePerGram: 32, purity: 0.95 },
]

const PAYOUT_CURRENCIES = [
  { label: 'USDC', value: 'USDC', rate: 1 },
  { label: 'USDT', value: 'USDT', rate: 1 },
  // Placeholder rate: update regularly or replace with live API (1 EUR ≈ 0.0000107 BTC at ~€93k/BTC)
  { label: 'BTC', value: 'BTC', rate: 0.0000107 },
]

const SPREAD = 0.10 // 10% flat fee

export default function GoldEstimator() {
  const [material, setMaterial] = useState(MATERIALS[0])
  const [weight, setWeight] = useState('')
  const [currency, setCurrency] = useState(PAYOUT_CURRENCIES[0])

  const weightNum = parseFloat(weight) || 0
  const marketValue = weightNum * material.pricePerGram
  const payoutEur = marketValue * (1 - SPREAD)
  const payoutConverted = payoutEur * currency.rate

  const hasResult = weightNum > 0

  const formatPayout = () => {
    if (currency.value === 'BTC') {
      return `≈ ${payoutConverted.toFixed(5)} BTC`
    }
    return `≈ ${payoutConverted.toFixed(0)} ${currency.value}`
  }

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Material</label>
          <select
            value={material.value}
            onChange={(e) => setMaterial(MATERIALS.find(m => m.value === e.target.value) || MATERIALS[0])}
            className="w-full bg-[#0A0A0A] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer"
          >
            {MATERIALS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Weight (grams)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 30"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Payout currency</label>
          <select
            value={currency.value}
            onChange={(e) => setCurrency(PAYOUT_CURRENCIES.find(c => c.value === e.target.value) || PAYOUT_CURRENCIES[0])}
            className="w-full bg-[#0A0A0A] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer"
          >
            {PAYOUT_CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {hasResult ? (
        <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 mb-1">Your item</p>
              <p className="font-semibold text-sm">{weight}g {material.label}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Market value</p>
              <p className="font-semibold text-white">€{marketValue.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">You would receive</p>
              <p className="text-xl font-bold text-[#D4AF37]">{formatPayout()}</p>
            </div>
          </div>
          <div className="border-t border-white/5 mt-4 pt-4 text-center">
            <p className="text-xs text-gray-500">
              Flat {(SPREAD * 100).toFixed(0)}% fee · Based on €{material.pricePerGram}/g spot price · Final amount confirmed after appraisal
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 mb-6 text-center text-gray-600">
          <p>Enter your item details above to see an estimate</p>
        </div>
      )}

      <div className="text-center">
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#c9a430] transition-colors"
        >
          Get Early Access
        </a>
      </div>
    </div>
  )
}
