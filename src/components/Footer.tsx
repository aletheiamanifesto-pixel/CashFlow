export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">CF</span>
              </div>
              <span className="font-bold text-xl">Cash<span className="text-[#D4AF37]">Flow</span></span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-4">
              The first insured gold-to-crypto exchange. Turn your valuables into digital assets, instantly.
            </p>
            <p className="text-gray-600 text-sm">CashFlow Sagl — Lugano, Switzerland</p>
            
            {/* Social links */}
            <div className="flex gap-4 mt-4">
              {[
                { name: 'X', href: 'https://x.com', icon: '𝕏' },
                { name: 'Instagram', href: 'https://instagram.com', icon: '📷' },
                { name: 'TikTok', href: 'https://tiktok.com', icon: '🎵' },
                { name: 'Telegram', href: 'https://t.me', icon: '✈️' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-full flex items-center justify-center hover:border-[#D4AF37] transition-colors text-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'AML Policy', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#D4AF37]/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} CashFlow Sagl — All rights reserved.
          </p>
          <p className="text-gray-700 text-xs text-center md:text-right max-w-md">
            ⚠️ CashFlow is currently in pre-launch. Licensing in progress. Not a financial product. Crypto investments carry risk.
          </p>
        </div>
      </div>
    </footer>
  )
}
