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

const SPREAD = 0.14 // 14% fee

export default function GoldEstimator() {
  const [material, setMaterial] = useState(MATERIALS[0])
  const [weight, setWeight] = useState('')
  
  const weightNum = parseFloat(weight) || 0
  const marketValue = weightNum * material.pricePerGram
  const payout = marketValue * (1 - SPREAD)
  
  const hasResult = weightNum > 0

  return (
    <div className="card-glass rounded-3xl p-8 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Material</label>
          <select
            value={material.value}
            onChange={(e) => setMaterial(MATERIALS.find(m => m.value === e.target.value) || MATERIALS[0])}
            className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer"
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
            className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-600"
          />
        </div>
      </div>
      
      {hasResult ? (
        <div className="bg-[#0A0A0A] rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 mb-1">Your item</p>
              <p className="font-semibold">{weight}g {material.label}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Market value</p>
              <p className="font-semibold text-white">€{marketValue.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">You receive</p>
              <p className="text-xl font-bold text-[#D4AF37]">~{payout.toFixed(0)} USDC</p>
            </div>
          </div>
          <div className="border-t border-[#D4AF37]/10 mt-4 pt-4 text-center">
            <p className="text-xs text-gray-500">
              Fee: {(SPREAD * 100).toFixed(0)}% spread · Based on €{material.pricePerGram}/g spot price · Actual payout confirmed after appraisal
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] rounded-2xl p-6 mb-6 text-center text-gray-600">
          <p>Enter your item details above to see an instant estimate</p>
        </div>
      )}
      
      <div className="text-center">
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 gold-gradient text-black font-bold px-6 py-3 rounded-full hover:opacity-90 transition-all hover:scale-105"
        >
          Want the exact amount? Join the waitlist!
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
