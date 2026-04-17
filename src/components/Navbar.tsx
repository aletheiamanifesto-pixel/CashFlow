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
      scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#D4AF37]/10' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">CF</span>
          </div>
          <span className="font-bold text-xl">
            Cash<span className="text-[#D4AF37]">Flow</span>
          </span>
          </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</a>
          <a href="#waitlist" className="text-gray-400 hover:text-white transition-colors text-sm">What We Accept</a>
          <a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a>
          <Link href="/partners" className="text-gray-400 hover:text-white transition-colors text-sm">Partners</Link>
        </div>
        
        <a
          href="#waitlist"
          className="gold-gradient text-black font-bold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-all hover:scale-105"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  )
}
