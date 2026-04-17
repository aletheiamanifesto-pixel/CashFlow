import clsx from 'clsx'

export interface Asset {
  id: string
  type: string
  description: string
  estimatedWeight: number
  estimatedValue: number
  appraisedValue?: number
  status: 'PENDING' | 'RECEIVED' | 'APPRAISED' | 'PAID' | 'REJECTED'
  nftTokenId?: string
  preferredCurrency: string
  createdAt: string
  photos?: string[]
}

const STATUS_CONFIG = {
  PENDING: { label: 'In attesa', color: 'text-yellow-400', bg: 'bg-yellow-400/10', dot: 'bg-yellow-400' },
  RECEIVED: { label: 'Ricevuto', color: 'text-blue-400', bg: 'bg-blue-400/10', dot: 'bg-blue-400' },
  APPRAISED: { label: 'Periziato', color: 'text-gold', bg: 'bg-gold/10', dot: 'bg-gold' },
  PAID: { label: 'Pagato', color: 'text-green-400', bg: 'bg-green-400/10', dot: 'bg-green-400' },
  REJECTED: { label: 'Rifiutato', color: 'text-red-400', bg: 'bg-red-400/10', dot: 'bg-red-400' },
}

const ASSET_TYPE_LABELS: Record<string, string> = {
  gold: '🥇 Oro',
  silver: '🥈 Argento',
  watch: '⌚ Orologio',
  jewelry: '💍 Gioielleria',
  gemstone: '💎 Pietre Preziose',
  other: '📦 Altro',
}

interface AssetCardProps {
  asset: Asset
  onClick?: (asset: Asset) => void
}

export default function AssetCard({ asset, onClick }: AssetCardProps) {
  const status = STATUS_CONFIG[asset.status]
  const typeLabel = ASSET_TYPE_LABELS[asset.type] || asset.type
  const displayValue = asset.appraisedValue ?? asset.estimatedValue

  return (
    <div
      className={clsx(
        'bg-dark-card border border-white/10 rounded-xl p-5 transition-all duration-200',
        onClick && 'cursor-pointer hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5'
      )}
      onClick={() => onClick?.(asset)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-lg font-semibold text-white">{typeLabel}</p>
          <p className="text-sm text-gray-400 mt-0.5 line-clamp-2">{asset.description}</p>
        </div>
        <span className={clsx('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ml-2', status.bg, status.color)}>
          <span className={clsx('w-1.5 h-1.5 rounded-full', status.dot)} />
          {status.label}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-dark rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Peso Stimato</p>
          <p className="text-sm font-semibold text-white">{asset.estimatedWeight}g</p>
        </div>
        <div className="bg-dark rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">
            {asset.appraisedValue ? 'Valore Periziato' : 'Valore Stimato'}
          </p>
          <p className="text-sm font-semibold text-gold">
            €{displayValue.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* NFT Link */}
      {asset.nftTokenId && (
        <a
          href={`https://polygonscan.com/token/${process.env.NEXT_PUBLIC_ASSET_NFT_ADDRESS}?a=${asset.nftTokenId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          NFT #{asset.nftTokenId} · Vedi su Polygon
        </a>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-600">
          {new Date(asset.createdAt).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
        <span className="text-xs text-gray-500 bg-dark px-2 py-0.5 rounded">
          {asset.preferredCurrency}
        </span>
      </div>
    </div>
  )
}
