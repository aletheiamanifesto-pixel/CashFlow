export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="font-bold text-xl">
              Cash<span className="text-[#D4AF37]">Flow</span>
            </span>
            <p className="text-gray-500 text-sm mt-3 max-w-xs leading-relaxed">
              Exchange your physical assets for instant liquidity. Gold, watches, and precious stones — same day.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#111] border border-white/10 rounded-lg flex items-center justify-center hover:border-[#D4AF37]/50 transition-colors text-gray-400 hover:text-white text-sm font-bold"
                aria-label="X / Twitter"
              >
                X
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#111] border border-white/10 rounded-lg flex items-center justify-center hover:border-[#D4AF37]/50 transition-colors text-gray-400 hover:text-white text-xs font-bold"
                aria-label="Telegram"
              >
                TG
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'How it works', href: '#how-it-works' },
                { label: 'Partners', href: '#partners' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contact', href: 'mailto:hello@cashflow.com' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-gray-500 hover:text-white transition-colors text-sm">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'AML Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-xs">
            © 2025 CashFlow. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs text-center md:text-right">
            CashFlow is currently in pre-launch phase.
          </p>
        </div>
      </div>
    </footer>
  )
}
