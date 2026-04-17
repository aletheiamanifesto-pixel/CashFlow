import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DiamondEstimator from '@/components/DiamondEstimator'
import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sell Precious Stones — CashFlow',
  description: 'Know what your diamonds and precious stones are really worth. Certified or uncertified. Transparent pricing, instant payout.',
}

const CERT_PARTNERS = [
  { name: 'GIA', full: 'Gemological Institute of America' },
  { name: 'IGI', full: 'International Gemological Institute' },
  { name: 'HRD', full: 'HRD Antwerp' },
  { name: 'SSEF', full: 'Swiss Gemmological Institute' },
  { name: 'Gübelin', full: 'Gübelin Gem Lab' },
]

export default function StonesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero + Estimator */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span>Precious Stones</span>
            <ChevronRight className="w-3 h-3" />
            <span>Instant Estimate</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
            Know What Your Stones<br />Are Really Worth.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Diamonds, sapphires, rubies, emeralds. Certified or uncertified.
            Enter the details below for an instant estimate.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <DiamondEstimator />
        </div>
      </section>

      {/* Colored Stones */}
      <section className="py-20 px-4 bg-[#111] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Colored Stones & Signed Jewelry</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            For colored stones (sapphires, rubies, emeralds) and signed jewelry (Cartier, Van Cleef &amp; Arpels, Bulgari, Tiffany),
            request a personalized quote. We work with GIA, IGI, HRD, SSEF, and Gübelin certified gemologists.
          </p>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Stone Type', placeholder: 'e.g. Sapphire, Ruby, Emerald' },
                { label: 'Approximate Carat', placeholder: 'e.g. 2.5' },
                { label: 'Description', placeholder: 'Cut, color, any known treatments' },
                { label: 'Certificate (if any)', placeholder: 'GIA, SSEF, None...' },
              ].map(({ label, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-700"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-700"
                />
              </div>
            </div>
            <button className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#c9a430] transition-colors text-sm">
              Request a Personalized Quote
            </button>
          </div>
        </div>
      </section>

      {/* Certification Partners */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Trusted Certification Partners</h2>
            <p className="text-gray-400">We verify certificates instantly against the issuing lab&apos;s database.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {CERT_PARTNERS.map(({ name, full }) => (
              <div
                key={name}
                className="bg-[#111] border border-white/10 rounded-xl p-4 text-center hover:border-[#D4AF37]/30 transition-colors"
              >
                <p className="font-bold text-white text-lg mb-1">{name}</p>
                <p className="text-gray-500 text-xs leading-tight">{full}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm">
            Already have a certificate? We verify it instantly against the issuing lab&apos;s database.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" className="py-20 px-4 bg-[#111] border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Request a Quote</h2>
          <p className="text-gray-400 mb-8">Leave your email — our gemologists will reach out within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-[#0A0A0A] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-600 text-sm"
            />
            <Link
              href="/"
              className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#c9a430] transition-colors text-sm whitespace-nowrap"
            >
              Join Waitlist
            </Link>
          </div>
          <p className="text-gray-600 text-xs mt-4">
            <Link href="/" className="hover:text-gray-400 transition-colors">← Back to Home</Link>
            {' · '}
            <Link href="/gold" className="hover:text-gray-400 transition-colors">Sell Gold</Link>
            {' · '}
            <Link href="/watches" className="hover:text-gray-400 transition-colors">Sell Watches</Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
