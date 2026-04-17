import Link from 'next/link'
import PriceWidget from '@/components/PriceWidget'

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '📋',
    title: 'Prenota il Deposito',
    description: 'Compila il form online con tipo oggetto, descrizione e peso stimato. Completa la verifica KYC una sola volta.',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Perizia Professionale',
    description: 'Porta l\'oggetto in sede o spediscilo con corriere assicurato. Il perito certifica il valore in 24 ore.',
  },
  {
    step: '03',
    icon: '⚡',
    title: 'Ricevi USDC o USDT',
    description: 'Approvata la perizia, le stablecoin arrivano nel tuo wallet Polygon in pochi minuti. Niente bonifici, niente attese.',
  },
]

const FEATURES = [
  {
    icon: '⚡',
    title: 'Pagamento Istantaneo',
    description: 'Ricevi le crypto in meno di 10 minuti dalla conferma perizia. Niente giorni di attesa bancari.',
  },
  {
    icon: '🔒',
    title: 'Sicuro e Regolamentato',
    description: 'Iscritti OAM, conformi AML/KYC, caveau assicurato. Operativi nel pieno rispetto della normativa italiana.',
  },
  {
    icon: '📊',
    title: 'Prezzi Trasparenti',
    description: 'Vedi in tempo reale il prezzo LBMA e il nostro spread. Niente sorprese, niente commissioni nascoste.',
  },
  {
    icon: '🎨',
    title: 'NFT Certificato',
    description: 'Ogni asset deposita riceve un NFT ERC-721 su Polygon come certificato digitale di proprietà.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-lighter" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-xs font-medium text-gold">Il primo Compro Oro che paga in Crypto</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Deposita Oro,{' '}
                <span className="text-gradient-gold">Ricevi Crypto</span>{' '}
                in Minuti
              </h1>

              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Converti i tuoi beni fisici di valore — oro, gioielli, orologi — in stablecoin USDC o USDT.
                Perizia professionale certificata, pagamento istantaneo su Polygon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/deposit"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
                >
                  Inizia Ora
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="#come-funziona"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/40 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
                >
                  Come Funziona
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Iscritto OAM
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Conformità AML/KYC
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Caveau Assicurato
                </span>
              </div>
            </div>

            {/* Price Widget */}
            <div className="lg:pl-8">
              <PriceWidget />

              {/* Esempio payout */}
              <div className="mt-4 bg-dark-card border border-gold/20 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Esempio Calcolo</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Anello oro 18kt · 10g</span>
                    <span className="text-white">~€750</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Spread (15%)</span>
                    <span className="text-red-400">-€112</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Fee conversione (1%)</span>
                    <span className="text-red-400">-€6</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between">
                    <span className="text-white font-semibold">Ricevi in USDC</span>
                    <span className="text-gold font-bold">≈ 632 USDC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section id="come-funziona" className="py-20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Come Funziona</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tre semplici passi per convertire i tuoi beni fisici in stablecoin crypto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold/30 to-transparent z-0" />
                )}

                <div className="relative z-10 bg-dark-card border border-white/10 rounded-2xl p-6 text-center hover:border-gold/30 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold text-gold mb-2 tracking-widest">STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Perché Scegliere CashFlow</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Non siamo un compro oro tradizionale. Siamo la versione crypto-native.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="bg-dark-card border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-colors">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Prezzi Trasparenti</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Niente commissioni nascoste. Saprai sempre esattamente quanto riceverai prima di confermare.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-dark-card border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gold font-bold text-3xl mb-2">12–18%</p>
              <p className="text-white font-semibold mb-2">Spread sull&apos;Oro</p>
              <p className="text-sm text-gray-400">Sotto il prezzo LBMA. Standard del mercato compro oro professionale.</p>
            </div>
            <div className="bg-dark-card border border-gold/30 rounded-2xl p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-dark via-gold to-gold-dark" />
              <p className="text-gold font-bold text-3xl mb-2">1%</p>
              <p className="text-white font-semibold mb-2">Fee Conversione</p>
              <p className="text-sm text-gray-400">Per la conversione del valore in stablecoin e l&apos;invio on-chain.</p>
            </div>
            <div className="bg-dark-card border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gold font-bold text-3xl mb-2">2–3%</p>
              <p className="text-white font-semibold mb-2">Custodia Mensile</p>
              <p className="text-sm text-gray-400">Solo per il servizio di pegno. Se vendi, è incluso nello spread.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto a convertire il tuo oro in crypto?
          </h2>
          <p className="text-gray-400 mb-8">
            Registrati in 2 minuti, completa il KYC e prenota il tuo primo deposito.
          </p>
          <Link
            href="/deposit"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold px-10 py-4 rounded-xl transition-all duration-200 text-lg"
          >
            Inizia Ora — È Gratis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
