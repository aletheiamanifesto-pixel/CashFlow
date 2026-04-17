'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AssetCard, { type Asset } from '@/components/AssetCard'
import PriceWidget from '@/components/PriceWidget'
import { depositsApi, authApi } from '@/lib/api'

interface UserProfile {
  id: string
  email: string
  walletAddress?: string
  kycStatus: string
  role: string
  _count?: { deposits: number }
}

interface Stats {
  totalAssets: number
  totalValueEUR: number
  cryptoReceived: number
  pendingDeposits: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [assets, setAssets] = useState<Asset[]>([])
  const [stats, setStats] = useState<Stats>({ totalAssets: 0, totalValueEUR: 0, cryptoReceived: 0, pendingDeposits: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [userRes, depositsRes] = await Promise.all([
        authApi.me(),
        depositsApi.getAll(),
      ])
      setUser(userRes.data)

      const deposits: Asset[] = depositsRes.data
      setAssets(deposits)

      // Calcola statistiche
      const paid = deposits.filter((d) => d.status === 'PAID')
      const pending = deposits.filter((d) => ['PENDING', 'RECEIVED'].includes(d.status))
      setStats({
        totalAssets: deposits.length,
        totalValueEUR: deposits.reduce((sum, d) => sum + (d.appraisedValue ?? d.estimatedValue), 0),
        cryptoReceived: paid.reduce((sum, d) => sum + (d.appraisedValue ?? d.estimatedValue), 0),
        pendingDeposits: pending.length,
      })
    } catch {
      setError('Sessione scaduta. Effettua il login.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Caricamento dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-400 mb-4">{error}</p>
          <Link href="/" className="text-gold hover:text-gold-light underline">
            Torna alla Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Benvenuto{user?.email ? `, ${user.email.split('@')[0]}` : ''}
            </h1>
            <p className="text-gray-400 mt-1">
              KYC:{' '}
              <span className={
                user?.kycStatus === 'APPROVED' ? 'text-green-400' :
                user?.kycStatus === 'REJECTED' ? 'text-red-400' :
                'text-yellow-400'
              }>
                {user?.kycStatus === 'APPROVED' ? '✅ Verificato' :
                 user?.kycStatus === 'REJECTED' ? '❌ Rifiutato' :
                 user?.kycStatus === 'SUBMITTED' ? '⏳ In revisione' :
                 '⚠️ Non completato'}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/deposit"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuovo Deposito
            </Link>
            {user?.kycStatus !== 'APPROVED' && (
              <Link
                href="/kyc"
                className="inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Completa KYC
              </Link>
            )}
          </div>
        </div>

        {/* KYC warning */}
        {user?.kycStatus !== 'APPROVED' && (
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-yellow-400 font-semibold">Verifica KYC richiesta</p>
              <p className="text-sm text-gray-400 mt-1">
                Per eseguire depositi devi completare la verifica dell&apos;identità.{' '}
                <Link href="/kyc" className="text-yellow-400 underline">Verifica ora →</Link>
              </p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Asset Depositati"
            value={stats.totalAssets.toString()}
            icon="📦"
          />
          <StatCard
            label="Valore Totale"
            value={`€${stats.totalValueEUR.toLocaleString('it-IT', { minimumFractionDigits: 0 })}`}
            icon="💰"
            highlight
          />
          <StatCard
            label="Crypto Ricevute"
            value={`$${stats.cryptoReceived.toLocaleString('it-IT', { minimumFractionDigits: 0 })}`}
            icon="⚡"
          />
          <StatCard
            label="In Attesa"
            value={stats.pendingDeposits.toString()}
            icon="⏳"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Assets List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">I Tuoi Asset</h2>
              <span className="text-sm text-gray-500">{assets.length} totale</span>
            </div>

            {assets.length === 0 ? (
              <div className="bg-dark-card border border-white/10 border-dashed rounded-xl p-12 text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-gray-400 mb-2">Nessun deposito ancora</p>
                <p className="text-sm text-gray-600 mb-4">Inizia depositando il tuo primo asset</p>
                <Link
                  href="/deposit"
                  className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Prenota Deposito
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {assets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <PriceWidget />

            {/* Quick Links */}
            <div className="bg-dark-card border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Link Utili</h3>
              <div className="space-y-2">
                <Link href="/deposit" className="flex items-center justify-between py-2 text-sm text-gray-400 hover:text-white transition-colors border-b border-white/5">
                  <span>Prenota Deposito</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/kyc" className="flex items-center justify-between py-2 text-sm text-gray-400 hover:text-white transition-colors border-b border-white/5">
                  <span>Verifica KYC</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="https://polygonscan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span>PolygonScan</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, highlight }: {
  label: string
  value: string
  icon: string
  highlight?: boolean
}) {
  return (
    <div className={`bg-dark-card border rounded-xl p-4 ${highlight ? 'border-gold/30' : 'border-white/10'}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-xl">{icon}</span>
      </div>
      <p className={`text-xl font-bold ${highlight ? 'text-gold' : 'text-white'}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  )
}
