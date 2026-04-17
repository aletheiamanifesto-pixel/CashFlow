export default function HowItWorks() {
  const steps = [
    {
      icon: '📸',
      step: '01',
      title: 'Snap & Estimate',
      desc: 'Take a photo of your item and enter the weight. Get an instant AI-powered estimate in under 30 seconds. No appointment needed.',
    },
    {
      icon: '📦',
      step: '02',
      title: 'Ship For Free',
      desc: 'We send you a free insured shipping kit. Pack your item, seal it, and drop it off. Your shipment is tracked and insured up to €50,000.',
    },
    {
      icon: '💰',
      step: '03',
      title: 'Get Paid in Crypto',
      desc: 'Receive USDC or USDT directly to your wallet within 24 hours of us receiving your item. Escrow released automatically on confirmation.',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          How It <span className="text-gold-gradient">Works</span>
        </h2>
        <p className="text-gray-400 text-lg">Three simple steps to turn your valuables into crypto</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20" />
        
        {steps.map((step) => (
          <div key={step.step} className="relative text-center group">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 gold-gradient rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-1 bg-[#1A1A1A] rounded-full" />
              <span className="relative text-4xl">{step.icon}</span>
            </div>
            
            <div className="absolute top-0 right-1/2 translate-x-1/2 md:right-4 md:translate-x-0 -translate-y-1 text-xs font-bold text-[#D4AF37] bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-full px-2 py-0.5">
              {step.step}
            </div>
            
            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
            <p className="text-gray-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
