import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PartnerForm from '@/components/PartnerForm'
import {
  UserPlus,
  Package,
  Zap,
  Truck,
  Check,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'

export const metadata = {
  title: 'Partner Program — CashFlow',
  description:
    'Sell your gold stock on CashFlow and get paid in Bitcoin, USDC, or bank transfer in under 60 seconds. No more waiting 30 days for the refinery.',
}

const HOW_IT_WORKS = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Register',
    desc: 'Sign up and verify your business. Takes 10 minutes. Free.',
  },
  {
    icon: Package,
    step: '02',
    title: 'List Your Stock',
    desc: 'Enter type, weight, purity, photos. See the live market price and your net payout instantly.',
  },
  {
    icon: Zap,
    step: '03',
    title: 'Get Paid',
    desc: 'Accept the price, choose your payout: BTC (Lightning), USDC, USDT, or bank transfer. Funds arrive in seconds.',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Ship',
    desc: 'Ship the gold to the verified buyer with insured tracking. CashFlow holds escrow until delivery is confirmed.',
  },
]

const PRICING = [
  { range: 'Up to €5,000', fee: '3%', receive: '97%' },
  { range: '€5,000 – €20,000', fee: '2.5%', receive: '97.5%' },
  { range: '€20,000 – €50,000', fee: '2%', receive: '98%' },
  { range: 'Over €50,000', fee: '1.5%', receive: '98.5%' },
]

const PAYOUTS = [
  { name: 'Bitcoin (Lightning)', time: '3 seconds' },
  { name: 'USDC', time: '30 seconds' },
  { name: 'USDT', time: '30 seconds' },
  { name: 'EURC', time: '30 seconds' },
  { name: 'SEPA Instant', time: '10 seconds' },
]

const REQUIREMENTS = [
  'Active business registration with valid tax ID',
  'Industry registration (OAM in Italy or UCMP in Switzerland)',
  'KYC verification (ID + company documents — one time, 10 minutes)',
  'Minimum transaction: €500 / CHF 500',
]

const PLANS = [
  {
    name: 'Free',
    price: '€0',
    period: '/month',
    features: [
      'List stock & sell',
      'Instant payouts',
      'Basic dashboard',
      'Standard support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '€49',
    period: '/month',
    features: [
      'Everything in Free',
      'Priority listing on marketplace',
      'Advanced analytics & reports',
      'Export transaction history',
      'Dedicated support',
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '€199',
    period: '/month',
    features: [
      'Everything in Pro',
      'API access',
      'Multi-location management',
      'Custom integrations',
      'Account manager',
    ],
    cta: 'Contact Us',
    highlight: false,
  },
]

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0A0A0A]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.04] rounded-full blur-[120px]" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
            <span className="text-sm text-[#D4AF37]">B2B Partner Program</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Instant Liquidity for<br />
            <span className="text-gold-gradient">Your Gold Stock</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sell your stock on CashFlow and get paid in Bitcoin, USDC, or bank transfer — in under 60 seconds.
            No more waiting 30 days for the refinery.
          </p>

          <a
            href="#apply"
            className="inline-flex items-center gap-2 gold-gradient text-black font-bold px-8 py-4 rounded-full text-base hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[#D4AF37]/10"
          >
            Apply as Partner
            <ArrowRight className="w-4 h-4" />
          </a>

          <p className="text-gray-600 text-sm mt-6">
            Free to join · No setup fees · 2–3% flat fee
          </p>
        </div>
      </section>

      {/* ── Problem / Comparison ── */}
      <section className="py-24 px-4 bg-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your Capital Is <span className="text-gold-gradient">Stuck</span>
            </h2>
            <p className="text-gray-400 text-lg">
              The traditional refinery model kills your cash flow. Here&apos;s the difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="card-glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-6">
                Traditional Flow
              </h3>
              <ul className="space-y-4">
                {[
                  { day: 'Day 0', label: 'Buy gold from client' },
                  { day: 'Day 1–15', label: 'Gold sits in stock' },
                  { day: 'Day 15', label: 'Ship to refinery' },
                  { day: 'Day 15–30', label: 'Wait for payment' },
                ].map((item) => (
                  <li key={item.day} className="flex items-start gap-4">
                    <span className="text-xs font-mono bg-[#1A1A1A] border border-white/10 rounded px-2 py-1 text-gray-500 whitespace-nowrap mt-0.5">
                      {item.day}
                    </span>
                    <span className="text-gray-400 text-sm">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-500">Capital rotation:</p>
                <p className="text-2xl font-bold text-gray-300 mt-1">~1×/month</p>
              </div>
            </div>

            {/* CashFlow */}
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/40 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-[#D4AF37] uppercase tracking-wider mb-6">
                With CashFlow
              </h3>
              <ul className="space-y-4">
                {[
                  { day: 'Day 0', label: 'Buy gold from client' },
                  { day: 'Day 0', label: 'List on CashFlow (30 seconds)' },
                  { day: 'Day 0', label: 'Receive BTC/USDC (instant)' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-xs font-mono bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded px-2 py-1 text-[#D4AF37] whitespace-nowrap mt-0.5">
                      {item.day}
                    </span>
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
                <p className="text-sm text-gray-500">Capital rotation:</p>
                <p className="text-2xl font-bold text-[#D4AF37] mt-1">~20×/month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It <span className="text-gold-gradient">Works</span>
            </h2>
            <p className="text-gray-400 text-lg">Four simple steps from registration to payout</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="card-glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-xs font-mono text-gray-600">{step}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-4 bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Transparent, Volume-Based <span className="text-gold-gradient">Pricing</span>
            </h2>
          </div>

          <div className="card-glass rounded-2xl overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#D4AF37]/20">
                  <th className="text-left text-gray-500 uppercase tracking-wider text-xs font-semibold px-6 py-4">
                    Stock Value
                  </th>
                  <th className="text-left text-gray-500 uppercase tracking-wider text-xs font-semibold px-6 py-4">
                    CashFlow Fee
                  </th>
                  <th className="text-left text-[#D4AF37] uppercase tracking-wider text-xs font-semibold px-6 py-4">
                    You Receive
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING.map((row, i) => (
                  <tr
                    key={row.range}
                    className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
                  >
                    <td className="px-6 py-4 text-white font-medium">{row.range}</td>
                    <td className="px-6 py-4 text-gray-400">{row.fee}</td>
                    <td className="px-6 py-4 text-[#D4AF37] font-semibold">{row.receive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto leading-relaxed">
            Compare: your refinery pays 98–99% but in 30 days. CashFlow pays 97–98.5% in 30 seconds.
            The 1% difference buys you 30 days of liquidity.
          </p>
        </div>
      </section>

      {/* ── ROI Section ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The Math: Why Instant Liquidity{' '}
              <span className="text-gold-gradient">Pays for Itself</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Without */}
            <div className="card-glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-6">
                Without CashFlow
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  '€50,000 working capital',
                  '1× rotation/month = €600,000/year purchased',
                  '20% margin = €120,000/year revenue',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2 text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-500 text-sm">Annual revenue</p>
                <p className="text-3xl font-bold text-gray-300 mt-1">€120,000</p>
              </div>
            </div>

            {/* With */}
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/40 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-[#D4AF37] uppercase tracking-wider mb-6">
                With CashFlow
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { text: 'Same €50,000 working capital', highlight: false },
                  { text: '4× rotation/month = €2,400,000/year purchased', highlight: false },
                  { text: '20% margin = €480,000/year revenue', highlight: false },
                  { text: 'Minus CashFlow fees: −€60,000', highlight: false },
                  { text: 'Net gain: +€300,000/year', highlight: true },
                ].map((item) => (
                  <li key={item.text} className={`flex items-start gap-2 text-sm ${item.highlight ? 'text-[#D4AF37] font-semibold' : 'text-gray-400'}`}>
                    <TrendingUp className={`w-4 h-4 mt-0.5 shrink-0 ${item.highlight ? 'text-[#D4AF37]' : 'text-gray-600'}`} />
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
                <p className="text-gray-500 text-sm">Annual revenue</p>
                <p className="text-3xl font-bold text-[#D4AF37] mt-1">€420,000</p>
              </div>
            </div>
          </div>

          <p className="text-center text-white font-semibold text-lg">
            You pay 2.5% in fees. You make{' '}
            <span className="text-gold-gradient">300% more in revenue.</span>
          </p>
        </div>
      </section>

      {/* ── Payout Options ── */}
      <section className="py-24 px-4 bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-gold-gradient">Payout</span>
            </h2>
            <p className="text-gray-400 text-lg">You choose. Every time.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PAYOUTS.map((p) => (
              <div key={p.name} className="card-glass rounded-2xl p-5 text-center">
                <p className="font-semibold text-white text-sm mb-1">{p.name}</p>
                <p className="text-[#D4AF37] text-xs font-mono">{p.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Plans</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? 'bg-[#1A1A1A] border-2 border-[#D4AF37]'
                    : 'card-glass'
                }`}
              >
                {plan.highlight && (
                  <span className="text-xs font-semibold text-black bg-[#D4AF37] rounded-full px-3 py-1 mb-4 self-start">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#apply"
                  className={`w-full text-center font-bold py-3 rounded-xl transition-all text-sm ${
                    plan.highlight
                      ? 'gold-gradient text-black hover:opacity-90'
                      : 'border border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements ── */}
      <section className="py-24 px-4 bg-[#111]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Requirements to <span className="text-gold-gradient">Join</span>
            </h2>
          </div>

          <ul className="space-y-4">
            {REQUIREMENTS.map((req) => (
              <li key={req} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <span className="text-gray-300 text-sm leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Partner Application Form ── */}
      <section id="apply" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Apply as <span className="text-gold-gradient">Partner</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Fill out the form below. We&apos;ll review your application and get back to you within 48 hours.
            </p>
          </div>

          <div className="card-glass rounded-2xl p-8">
            <PartnerForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
