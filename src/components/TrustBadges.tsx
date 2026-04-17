export default function TrustBadges() {
  const badges = [
    { icon: '🇨🇭', label: 'Swiss-Based' },
    { icon: '🔒', label: 'Insured' },
    { icon: '📜', label: 'Licensed' },
    { icon: '⛓️', label: 'Blockchain Verified' },
    { icon: '🛡️', label: 'Escrow Protected' },
  ]

  return (
    <section className="py-8 px-4 border-y border-[#D4AF37]/10 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors">
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm font-medium whitespace-nowrap">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
