import Navbar from '@/components/Navbar'
import HowItWorks from '@/components/HowItWorks'
import GoldEstimator from '@/components/GoldEstimator'
import WaitlistForm from '@/components/WaitlistForm'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import PriceWidget from '@/components/PriceWidget'
import PartnerForm from '@/components/PartnerForm'
import { Gem, Watch, Coins, BarChart3, Users, DollarSign, Shield, Zap, Building2 } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ── 2. Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A]" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
            Exchange Your Assets<br />for Instant Liquidity
          </h1>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Sell gold, watches, and precious stones at your nearest partner location.
            Get paid in Bitcoin, USDC, or bank transfer — same day.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="#estimator"
              className="inline-flex items-center justify-center bg-[#D4AF37] text-black font-bold px-7 py-3.5 rounded-lg text-base hover:bg-[#c9a430] transition-colors"
            >
              Get an Estimate
            </a>
            <a
              href="#partners"
              className="inline-flex items-center justify-center bg-transparent border border-white/20 text-white font-semibold px-7 py-3.5 rounded-lg text-base hover:border-white/40 transition-colors"
            >
              Become a Partner
            </a>
          </div>

          <p className="text-sm text-gray-500">
            Transparent fees · Real-time pricing · Same-day payout
          </p>

          <div className="mt-8">
            <PriceWidget />
          </div>
        </div>
      </section>

      {/* ── 3. How It Works ── */}
      <section id="how-it-works" className="py-24 px-4 border-t border-white/5">
        <HowItWorks />
      </section>

      {/* ── 4. What We Accept ── */}
      <section className="py-24 px-4 bg-[#111] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Accept</h2>
            <p className="text-gray-400 text-lg">Professional appraisal for all major asset categories</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                Icon: BarChart3,
                title: 'Gold',
                desc: 'Bars, coins, and jewelry from 8kt to 24kt.',
                examples: '24kt bars · 18kt jewelry · gold coins',
              },
              {
                Icon: Watch,
                title: 'Luxury Watches',
                desc: 'Rolex, Omega, Patek Philippe, and other premium brands.',
                examples: 'Rolex · Omega · Patek · AP · IWC',
              },
              {
                Icon: Gem,
                title: 'Precious Stones',
                desc: 'Diamonds, sapphires, rubies, emeralds — certified or not.',
                examples: 'Diamonds · sapphires · rubies',
              },
              {
                Icon: Coins,
                title: 'Silver & Platinum',
                desc: 'Silver coins, bars, flatware. Platinum jewelry and ingots.',
                examples: 'Silver bars · platinum rings',
              },
            ].map(({ Icon, title, desc, examples }) => (
              <div key={title} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-colors">
                <Icon className="w-6 h-6 text-[#D4AF37] mb-4" />
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">{desc}</p>
                <p className="text-gray-600 text-xs">{examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Payout Options ── */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Payout Options</h2>
          <p className="text-gray-400 text-lg mb-12">
            You choose how you get paid. Always at real-time market rates.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'Bitcoin', sub: 'Lightning', badge: 'Instant' },
              { name: 'USDC', sub: 'USD Coin', badge: 'Under 10 min' },
              { name: 'USDT', sub: 'Tether', badge: 'Under 10 min' },
              { name: 'EURC', sub: 'Euro Coin', badge: 'Under 10 min' },
              { name: 'Bank Transfer', sub: 'SEPA / SWIFT', badge: 'Same day' },
            ].map(({ name, sub, badge }) => (
              <div key={name} className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
                <p className="font-bold text-sm mb-0.5">{name}</p>
                <p className="text-gray-500 text-xs mb-2">{sub}</p>
                <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-medium px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Estimator ── */}
      <section id="estimator" className="py-24 px-4 bg-[#111] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Get an Estimate</h2>
            <p className="text-gray-400 text-lg">Find out how much your item is worth before you visit a partner</p>
          </div>
          <GoldEstimator />
        </div>
      </section>

      {/* ── 7. Partners (B2B) ── */}
      <section id="partners" className="py-24 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Become a CashFlow Collection Point</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Earn commission on every transaction. We send you new clients, you do what you already do best — appraise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                Icon: Users,
                title: 'New Clients',
                desc: 'We drive customers to your location through our platform and app.',
              },
              {
                Icon: DollarSign,
                title: '5% Commission',
                desc: 'Earn on every transaction, paid monthly in crypto or bank transfer.',
              },
              {
                Icon: Shield,
                title: 'Zero Cost',
                desc: 'No setup fees, no subscriptions, no risk. Start immediately.',
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-[#111] border border-white/10 rounded-xl p-6">
                <Icon className="w-6 h-6 text-[#D4AF37] mb-4" />
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-[#111] border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-xl font-bold">Apply as Partner</h3>
            </div>
            <PartnerForm />
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="py-24 px-4 bg-[#111] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── 9. Waitlist ── */}
      <section id="waitlist" className="py-24 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get Early Access</h2>
          <p className="text-gray-400 text-lg mb-10">
            Leave your email — we&apos;ll notify you when CashFlow launches in your area.
          </p>
          <WaitlistForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
