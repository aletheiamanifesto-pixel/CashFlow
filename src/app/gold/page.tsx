import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoldEstimatorV2 from '@/components/GoldEstimatorV2'
import { Layers, Circle, Gem, Recycle, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sell Your Gold — CashFlow',
  description: "See exactly what you'll get for your gold. Live market price, transparent fee, instant payout in BTC, USDC, or EUR.",
}

export default function GoldPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero + Estimator */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span>Gold</span>
            <ChevronRight className="w-3 h-3" />
            <span>Instant Estimate</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
            Sell Your Gold.<br />See Exactly What You&apos;ll Get.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Enter the weight and karat below. Live market price, transparent fee, instant payout estimate.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <GoldEstimatorV2 />
        </div>
      </section>

      {/* What We Accept */}
      <section className="py-20 px-4 bg-[#111] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What We Accept</h2>
            <p className="text-gray-400">All forms of gold — any karat, any condition</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                Icon: Layers,
                title: 'Bars & Ingots',
                desc: 'Investment gold bars from 1g to 1kg. Any refinery.',
              },
              {
                Icon: Circle,
                title: 'Coins',
                desc: 'Krugerrand, Maple Leaf, Philharmonic, Sovereign, and more.',
              },
              {
                Icon: Gem,
                title: 'Jewelry',
                desc: 'Chains, rings, bracelets, earrings. Any karat from 8kt to 24kt.',
              },
              {
                Icon: Recycle,
                title: 'Scrap Gold',
                desc: 'Dental gold, broken jewelry, gold dust. We accept it all.',
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-colors">
                <Icon className="w-6 h-6 text-[#D4AF37] mb-4" />
                <h3 className="text-base font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Appraisal Works */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How Appraisal Works</h2>
          <p className="text-gray-400 mb-12 leading-relaxed">
            Your gold is appraised by licensed, registered dealers (OAM Italy / UCMP Switzerland).
            Every appraisal includes precision weighing and XRF purity analysis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Bring Items', desc: 'Visit your nearest CashFlow partner location with your gold.' },
              { step: '02', title: 'Professional Appraisal', desc: 'Precision weighing + XRF purity testing by licensed dealers.' },
              { step: '03', title: 'Get Paid', desc: 'Receive BTC, USDC, USDT, or EUR — same day.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-[#111] border border-white/10 rounded-xl p-6 text-left">
                <span className="text-[#D4AF37] font-mono text-sm font-bold">{step}</span>
                <h3 className="text-base font-bold mt-2 mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" className="py-20 px-4 bg-[#111] border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to sell?</h2>
          <p className="text-gray-400 mb-8">Leave your email — we&apos;ll notify you when CashFlow launches in your area.</p>
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
            <Link href="/watches" className="hover:text-gray-400 transition-colors">Sell Watches</Link>
            {' · '}
            <Link href="/stones" className="hover:text-gray-400 transition-colors">Sell Stones</Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
