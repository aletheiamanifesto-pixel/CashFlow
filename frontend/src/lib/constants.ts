// Costanti di configurazione CashFlow

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// Chain IDs
export const CHAIN_IDS = {
  POLYGON_MAINNET: 137,
  POLYGON_MUMBAI: 80001,
  HARDHAT_LOCAL: 31337,
} as const

export const ACTIVE_CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '137')

// Contract Addresses (Polygon)
export const CONTRACT_ADDRESSES = {
  ASSET_NFT: process.env.NEXT_PUBLIC_ASSET_NFT_ADDRESS || '0x0000000000000000000000000000000000000000',
  USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC su Polygon
  USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT su Polygon
} as const

// Tipi di asset accettati
export const ASSET_TYPES = [
  { value: 'gold', label: 'Oro (monete, lingotti, gioielli)' },
  { value: 'silver', label: 'Argento' },
  { value: 'watch', label: 'Orologio di lusso' },
  { value: 'jewelry', label: 'Gioielleria / Bigiotteria preziosa' },
  { value: 'gemstone', label: 'Pietre preziose' },
  { value: 'other', label: 'Altro oggetto di valore' },
] as const

// Soglie AML (D.Lgs. 231/2007)
export const AML_THRESHOLDS = {
  ENHANCED_DUE_DILIGENCE: 5000, // EUR - richiede verifica rafforzata
  MANDATORY_REPORTING: 10000,   // EUR - obbligo di segnalazione UIF
} as const

// Spread e commissioni
export const FEES = {
  SPREAD_MIN: 0.12,     // 12% spread minimo sul prezzo oro
  SPREAD_MAX: 0.18,     // 18% spread massimo
  CONVERSION_FEE: 0.01, // 1% fee conversione crypto
  CUSTODY_MONTHLY: 0.02, // 2% mensile per servizio pegno
} as const

// Valute stablecoin supportate
export const SUPPORTED_CURRENCIES = ['USDC', 'USDT'] as const
