'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import {
  DIAMOND_PRICES,
  DIAMOND_CUT_MULTIPLIERS,
  DIAMOND_CERT_MULTIPLIERS,
  getDiamondSizeMultiplier,
  STONE_FEE_RATE,
  BTC_PRICE_EUR,
  formatEur,
} from '@/lib/prices'

const CUTS = Object.keys(DIAMOND_CUT_MULTIPLIERS)
const COLORS = Object.keys(DIAMOND_PRICES)
const CLARITIES = Object.keys(DIAMOND_PRICES['D'])
const CERTS = Object.keys(DIAMOND_CERT_MULTIPLIERS)
const CURRENCIES = ['BTC', 'USDC', 'USDT', 'EUR'] as const
type Currency = typeof CURRENCIES[number]

export default function DiamondEstimator() {
  const [carats, setCarats] = useState(1.00)
  const [cut, setCut] = useState(CUTS[0])
  const [color, setColor] = useState(COLORS[0])
  const [clarity, setClarity] = useState(CLARITIES[3]) // VS1 default
  const [cert, setCert] = useState(CERTS[0])
  const [currency, setCurrency] = useState<Currency>('BTC')

  const basePricePerCarat = DIAMOND_PRICES[color]?.[clarity] ?? 0
  const sizeMult = getDiamondSizeMultiplier(carats)
  const cutMult = DIAMOND_CUT_MULTIPLIERS[cut]
  const certMult = DIAMOND_CERT_MULTIPLIERS[cert]
  const marketValue = carats * basePricePerCarat * sizeMult * cutMult * certMult
  const feeAmount = marketValue * STONE_FEE_RATE
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
      {/* Carat weight */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">Carat Weight</label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0.01}
            step={0.01}
            value={carats}
            onChange={(e) => setCarats(Math.max(0.01, parseFloat(e.target.value) || 0))}
            className="w-28 bg-[#0A0A0A] border border-white/10 text-white text-lg font-semibold rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors text-center"
          />
          <span className="text-gray-400 text-sm">ct</span>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setCarats(c => Math.max(0.01, parseFloat((c - 0.01).toFixed(2))))}
              className="w-9 h-9 bg-[#0A0A0A] border border-white/10 rounded-lg flex items-center justify-center hover:border-white/30 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCarats(c => parseFloat((c + 0.01).toFixed(2)))}
              className="w-9 h-9 bg-[#0A0A0A] border border-white/10 rounded-lg flex items-center justify-center hover:border-white/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cut */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-3">Cut</label>
        <div className="flex flex-wrap gap-2">
          {CUTS.map((c) => (
            <button
              key={c}
              onClick={() => setCut(c)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                cut === c
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-3">Color</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-10 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                color === c
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Clarity */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-3">Clarity</label>
        <div className="flex flex-wrap gap-2">
          {CLARITIES.map((c) => (
            <button
              key={c}
              onClick={() => setClarity(c)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                clarity === c
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Certificate */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">Certificate</label>
        <div className="flex flex-wrap gap-2">
          {CERTS.map((c) => (
            <button
              key={c}
              onClick={() => setCert(c)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                cert === c
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/30'
              }`}
            >
              {c}
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
          <span className="text-gray-400">Base price ({color}/{clarity})</span>
          <span className="text-white font-medium">{formatEur(basePricePerCarat)}/ct</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Size multiplier ({carats}ct)</span>
          <span className="text-white font-medium">×{sizeMult.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Cut ({cut})</span>
          <span className="text-white font-medium">×{cutMult.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Certificate ({cert})</span>
          <span className="text-white font-medium">×{certMult.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Market value</span>
          <span className="text-white font-medium">{formatEur(marketValue)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">CashFlow fee ({(STONE_FEE_RATE * 100).toFixed(0)}%)</span>
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
        Request a Quote
      </a>

      <p className="text-center text-gray-600 text-xs mt-4">
        * Estimate only. Final price determined after professional appraisal.
      </p>
    </div>
  )
}
