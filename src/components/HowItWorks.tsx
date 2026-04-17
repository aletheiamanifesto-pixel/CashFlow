import { MapPin, Eye, Wallet } from 'lucide-react'

const steps = [
  {
    Icon: MapPin,
    step: '01',
    title: 'Visit a Partner',
    desc: 'Find your nearest CashFlow collection point and bring your items for professional appraisal.',
  },
  {
    Icon: Eye,
    step: '02',
    title: 'Get Appraised',
    desc: 'Our certified partners evaluate your assets on the spot. You see the market price and our flat fee before confirming.',
  },
  {
    Icon: Wallet,
    step: '03',
    title: 'Choose Your Payout',
    desc: 'Receive Bitcoin via Lightning, USDC, USDT, or bank transfer. Funds arrive within minutes.',
  },
]

export default function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-gray-400 text-lg">Three simple steps to turn your valuables into cash</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map(({ Icon, step, title, desc }) => (
          <div key={step} className="relative text-center group">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-6 border border-[#D4AF37]/40 rounded-xl bg-[#111]">
              <Icon className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-auto md:right-auto text-xs font-bold text-[#D4AF37] bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-full px-2 py-0.5 -translate-y-2">
              {step}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
