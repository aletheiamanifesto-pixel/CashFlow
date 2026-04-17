import Navbar from '@/components/Navbar'
import TrustBadges from '@/components/TrustBadges'
import HowItWorks from '@/components/HowItWorks'
import GoldEstimator from '@/components/GoldEstimator'
import WaitlistForm from '@/components/WaitlistForm'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import PriceWidget from '@/components/PriceWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] opacity-5 rounded-full blur-[120px]" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-[#D4AF37]">Pre-launch — Join the waitlist today</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Turn Your <span className="text-gold-gradient">Gold</span> Into{' '}
            <span className="text-gold-gradient">Crypto</span> in Minutes
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            The first insured gold-to-crypto exchange. Ship your gold, get paid in stablecoin.
            Instant. Transparent. Swiss-based.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 gold-gradient text-black font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[#D4AF37]/20"
            >
              Join the Waitlist
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] border border-[#D4AF37]/30 text-[#FAFAFA] font-semibold px-8 py-4 rounded-full text-lg hover:border-[#D4AF37] transition-all"
            >
              How It Works
            </a>
          </div>
          
          <PriceWidget />
        </div>
      </section>

      <TrustBadges />

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4">
        <HowItWorks />
      </section>

      {/* What We Accept */}
      <section className="py-24 px-4 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We <span className="text-gold-gradient">Accept</span>
            </h2>
            <p className="text-gray-400 text-lg">Turn any of these valuables into crypto</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🥇',
                title: 'Gold',
                desc: 'Bars, coins, jewelry. 8kt to 24kt gold accepted.',
                examples: '24kt bars, 18kt jewelry, gold coins'
              },
              {
                icon: '⌚',
                title: 'Luxury Watches',
                desc: 'Rolex, Omega, Patek Philippe, Audemars Piguet and more.',
                examples: 'Rolex, Omega, Patek, AP, IWC'
              },
              {
                icon: '💎',
                title: 'Precious Stones',
                desc: 'Diamonds, sapphires, rubies, emeralds — certified or uncertified.',
                examples: 'Diamonds, sapphires, rubies'
              },
              {
                icon: '🪙',
                title: 'Silver & Platinum',
                desc: 'Silver coins, bars, flatware. Platinum jewelry and ingots.',
                examples: 'Silver bars, platinum rings'
              },
            ].map((item) => (
              <div key={item.title} className="card-glass rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all group">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#D4AF37] mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.desc}</p>
                <p className="text-gray-600 text-xs">{item.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CashFlow */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why <span className="text-gold-gradient">CashFlow</span>
            </h2>
            <p className="text-gray-400 text-lg">Everything traditional pawn shops can&apos;t offer</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Instant Payment',
                desc: 'Crypto in minutes, not bank days. Receive USDC/USDT directly to your wallet as soon as appraisal is complete.'
              },
              {
                icon: '🔒',
                title: 'Escrow Protection',
                desc: 'Funds are locked on-chain before you even ship. You see the money is secured before sending anything.'
              },
              {
                icon: '🇨🇭',
                title: 'Swiss-Based & Insured',
                desc: 'Headquartered in Lugano, Switzerland. Every shipment insured up to €50,000. Bank-grade security.'
              },
              {
                icon: '📊',
                title: 'Transparent Pricing',
                desc: 'Live market rates visible at all times. Spread shown upfront. No hidden fees, ever.'
              },
              {
                icon: '🏛️',
                title: 'Fully Licensed',
                desc: 'VASP license + precious metals dealer certification in progress. Operating under Swiss financial law.'
              },
              {
                icon: '📸',
                title: 'AI-Powered Estimate',
                desc: 'Get an instant price estimate in 30 seconds just by entering your item details. No appointment needed.'
              },
            ].map((item) => (
              <div key={item.title} className="card-glass rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <section className="py-24 px-4 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Transparent <span className="text-gold-gradient">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12">No surprises. Ever.</p>
          
          <div className="card-glass rounded-3xl p-8 md:p-12 mb-8">
            <p className="text-gray-400 mb-6 text-sm uppercase tracking-widest">Example transaction</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Your item</p>
                <p className="text-xl font-bold">18kt Gold Necklace</p>
                <p className="text-gray-400">30 grams</p>
              </div>
              <div className="text-[#D4AF37] text-3xl">→</div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Market value</p>
                <p className="text-xl font-bold text-white">€1,800</p>
              </div>
              <div className="text-[#D4AF37] text-3xl">→</div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">You receive</p>
                <p className="text-3xl font-bold text-[#D4AF37]">~1,550 USDC</p>
              </div>
            </div>
            <div className="border-t border-[#D4AF37]/20 pt-6">
              <p className="text-gray-400">
                Our fee: <span className="text-white font-semibold">transparent 12–15% spread</span> · No hidden costs · No surprise deductions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estimate Widget */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Instant <span className="text-gold-gradient">Estimate</span>
            </h2>
            <p className="text-gray-400 text-lg">Find out how much your valuables are worth in crypto</p>
          </div>
          <GoldEstimator />
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="py-24 px-4 bg-[#1A1A1A]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-6">🔥</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Join the <span className="text-gold-gradient">Waitlist</span>
          </h2>
          <p className="text-gray-400 text-lg mb-2">Be first to access CashFlow when we launch.</p>
          <p className="text-[#D4AF37] font-semibold mb-10">🔥 Already 847 people in line</p>
          <WaitlistForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-gold-gradient">Questions</span>
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      <Footer />
    </main>
  )
}
