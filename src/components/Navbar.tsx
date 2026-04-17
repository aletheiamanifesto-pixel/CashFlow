'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const ASSET_LINKS = [
  { href: '/gold', label: 'Gold' },
  { href: '/watches', label: 'Watches' },
  { href: '/stones', label: 'Precious Stones' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [assetsOpen, setAssetsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAssetsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How it works</Link>

          {/* Assets dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAssetsOpen(o => !o)}
              aria-expanded={assetsOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Assets
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${assetsOpen ? 'rotate-180' : ''}`} />
            </button>
            {assetsOpen && (
              <div role="menu" className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-[#111] border border-white/10 rounded-xl shadow-xl py-1 z-50">
                {ASSET_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    onClick={() => setAssetsOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#partners" className="text-gray-400 hover:text-white transition-colors text-sm">Partners</Link>
          <Link href="/#faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</Link>
        </div>

        {/* Desktop CTA */}
        <Link
          href="/#estimator"
          className="hidden md:inline-flex bg-[#D4AF37] text-black font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#c9a430] transition-colors"
        >
          Get Started
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
          <div className="w-5 h-0.5 bg-current transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 border-t border-white/5 px-4 py-4 space-y-1">
          <Link href="/#how-it-works" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-gray-400 hover:text-white transition-colors">How it works</Link>
          <div className="py-2">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">Assets</p>
            {ASSET_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block py-1.5 pl-3 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <Link href="/#partners" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-gray-400 hover:text-white transition-colors">Partners</Link>
          <Link href="/#faq" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link>
          <div className="pt-3">
            <Link href="/#estimator" className="block w-full text-center bg-[#D4AF37] text-black font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#c9a430] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
