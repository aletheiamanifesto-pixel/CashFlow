export default function TrustBadges() {
  const badges = [
    'Transparent fees',
    'Real-time pricing',
    'Same-day payout',
    'Partner-appraised',
    'KYC verified',
  ]

  return (
    <section className="py-6 px-4 border-y border-white/5 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-500 text-sm">
          {badges.map((badge, i) => (
            <span key={badge} className="flex items-center gap-6">
              {i > 0 && <span className="text-gray-700" aria-hidden="true">·</span>}
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
