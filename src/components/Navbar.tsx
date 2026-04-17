'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">
            Cash<span className="text-[#D4AF37]">Flow</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How it works</a>
          <a href="#estimator" className="text-gray-400 hover:text-white transition-colors text-sm">Estimator</a>
          <a href="#partners" className="text-gray-400 hover:text-white transition-colors text-sm">Partners</a>
          <a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a>
        </div>

        <a
          href="#estimator"
          className="bg-[#D4AF37] text-black font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#c9a430] transition-colors"
        >
          Get Started
        </a>
      </div>
    </nav>
  )
}
