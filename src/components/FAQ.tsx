'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Is this legal?',
    a: 'Yes. We are in the process of obtaining a VASP (Virtual Asset Service Provider) license and a precious metals dealer certification in Switzerland. All operations comply with Swiss AML/KYC regulations. Pre-launch operations are conducted under legal counsel.',
  },
  {
    q: 'How is my gold insured during shipping?',
    a: 'Every shipment is fully insured up to €50,000 through our logistics partner. Your items are tracked door-to-door with tamper-evident packaging. In the unlikely event of loss or damage, you are fully compensated.',
  },
  {
    q: 'Which cryptocurrencies can I receive?',
    a: 'We currently support USDC, USDT, BTC, and ETH. We plan to add more options based on user demand. Stablecoins (USDC/USDT) are recommended for price stability.',
  },
  {
    q: 'How long does the process take?',
    a: 'From the moment we receive your item, the appraisal takes 24–48 hours. Once confirmed, crypto is released to your wallet within minutes via smart contract. The entire process including shipping typically takes 3–5 business days.',
  },
  {
    q: 'Can I get my items back?',
    a: 'Yes! With our upcoming Digital Pawn service (coming soon), you can deposit your item as collateral, receive a crypto loan, and reclaim your item by repaying the loan plus interest.',
  },
  {
    q: 'Is KYC required?',
    a: 'Yes. For AML compliance and Swiss financial regulations, we require a quick identity verification. The process takes approximately 2 minutes and is powered by a trusted third-party KYC provider.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3" id="faq">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="card-glass rounded-2xl overflow-hidden transition-all"
        >
          <button
            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#D4AF37]/5 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-base">{faq.q}</span>
            <span className={`text-[#D4AF37] flex-shrink-0 text-xl transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
          
          {open === i && (
            <div className="px-6 pb-5 animate-fade-in">
              <p className="text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
