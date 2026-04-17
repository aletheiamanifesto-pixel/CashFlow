'use client'

import { useState, useEffect } from 'react'

const MOCK_GOLD_PRICE_PER_GRAM_EUR = 85

export default function PriceWidget() {
  const [price, setPrice] = useState(MOCK_GOLD_PRICE_PER_GRAM_EUR)
  const [change, setChange] = useState(0.43)

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 0.4
      setPrice(prev => Number((prev + fluctuation).toFixed(2)))
      setChange(prev => Number((prev + (Math.random() - 0.5) * 0.1).toFixed(2)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const isPositive = change >= 0

  return (
    <div className="inline-flex items-center gap-3 bg-[#111] border border-white/10 rounded-xl px-5 py-3">
      <div className="text-left">
        <p className="text-xs text-gray-500 uppercase tracking-wider">Gold 24kt / gram</p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-lg font-bold text-white">€{price.toFixed(2)}</p>
          <span className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-xs text-gray-500">Live</span>
      </div>
    </div>
  )
}
