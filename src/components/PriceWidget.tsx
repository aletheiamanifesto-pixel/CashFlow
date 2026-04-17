'use client'

import { useState, useEffect } from 'react'

const MOCK_GOLD_PRICE_PER_GRAM_EUR = 85 // €85/g for 24kt gold

export default function PriceWidget() {
  const [price, setPrice] = useState(MOCK_GOLD_PRICE_PER_GRAM_EUR)
  const [change, setChange] = useState(0.43)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // Simulate live price updates with small random changes
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 0.4
      setPrice(prev => Number((prev + fluctuation).toFixed(2)))
      setChange(prev => Number((prev + (Math.random() - 0.5) * 0.1).toFixed(2)))
      setLastUpdated(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const isPositive = change >= 0

  return (
    <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl px-6 py-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🥇</span>
        <div className="text-left">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Gold (24kt) / gram</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-[#D4AF37]">€{price.toFixed(2)}</p>
            <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{change.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      <div className="border-l border-[#D4AF37]/20 pl-4 hidden sm:block">
        <p className="text-xs text-gray-500">Updated</p>
        <p className="text-sm text-gray-400">
          {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-xs text-gray-500">Live</span>
      </div>
    </div>
  )
}
