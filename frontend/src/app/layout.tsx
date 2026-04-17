import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CashFlow — Deposita Oro, Ricevi Crypto',
  description: 'La prima piattaforma italiana che ti permette di convertire beni fisici di valore (oro, gioielli, orologi) in stablecoin crypto. Veloce, sicuro, trasparente.',
  keywords: ['compro oro', 'crypto', 'stablecoin', 'USDC', 'USDT', 'oro', 'gioielli'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-dark text-white min-h-screen`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
