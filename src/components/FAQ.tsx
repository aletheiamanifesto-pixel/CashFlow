'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'How is the price determined?',
    a: 'Based on live LBMA market rates with a transparent flat fee shown before you confirm. No hidden costs, no surprise deductions.',
  },
  {
    q: 'What do I need to bring?',
    a: 'Your items and a valid ID. First-time users complete a quick KYC verification, which takes about 2 minutes.',
  },
  {
    q: 'How fast do I get paid?',
    a: 'Bitcoin via Lightning: seconds. USDC/USDT: under 10 minutes. Bank transfer: same business day.',
  },
  {
    q: 'Is my transaction insured?',
    a: 'All items are insured from the moment they are appraised at a partner location. You are fully covered throughout the process.',
  },
  {
    q: "What's the minimum value?",
    a: 'We accept items from €100 / CHF 100 upward.',
  },
  {
    q: 'How do I become a partner?',
    a: 'Fill out the form in the Partners section above. We will contact you within 48 hours.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-2" id="faq">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-[#111] border border-white/10 rounded-xl overflow-hidden transition-all"
        >
          <button
            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
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
