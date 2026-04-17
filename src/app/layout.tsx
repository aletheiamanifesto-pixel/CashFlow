import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CashFlow — Turn Your Gold Into Crypto',
  description: 'The first insured gold-to-crypto exchange. Ship your gold, get paid in stablecoin. Instant. Transparent. Swiss-based.',
  keywords: 'gold crypto exchange, sell gold for cryptocurrency, gold to USDC, Swiss fintech, precious metals crypto',
  openGraph: {
    title: 'CashFlow — Turn Your Gold Into Crypto',
    description: 'The first insured gold-to-crypto exchange. Ship your gold, get paid in stablecoin. Instant. Transparent. Swiss-based.',
    type: 'website',
    url: 'https://cashflow.swiss',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CashFlow — Turn Your Gold Into Crypto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CashFlow — Turn Your Gold Into Crypto',
    description: 'The first insured gold-to-crypto exchange. Ship your gold, get paid in stablecoin. Instant. Transparent. Swiss-based.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-[#0A0A0A] text-[#FAFAFA]">
        {children}
      </body>
    </html>
  )
}
