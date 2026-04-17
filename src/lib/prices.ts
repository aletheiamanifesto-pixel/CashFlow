// src/lib/prices.ts
// Central price data for CashFlow estimators
// TODO: Replace hardcoded prices with live APIs (GoldAPI.io, CoinGecko, Chrono24, Rapaport)

// ─── Gold ───────────────────────────────────────────────────────────────────
// Gold spot price per gram for 24kt pure gold (EUR)
// TODO: Replace with live API (e.g., GoldAPI.io)
export const GOLD_PRICE_PER_GRAM = 92.50

// BTC price in EUR
// TODO: Replace with live API (e.g., CoinGecko)
export const BTC_PRICE_EUR = 94250

// Gold karat purities
export const KARAT_PURITIES: Record<string, number> = {
  '24kt': 1.0,
  '18kt': 0.75,
  '14kt': 0.585,
  '9kt': 0.375,
}

// CashFlow fee tiers for gold (based on market value in EUR)
export function getGoldFeeRate(marketValue: number): number {
  if (marketValue < 5000) return 0.03
  if (marketValue < 20000) return 0.025
  if (marketValue < 50000) return 0.02
  return 0.015
}

// ─── Watches ────────────────────────────────────────────────────────────────
// Watch reference prices (approximate market value, EUR)
// TODO: Replace with live data from Chrono24 API or WatchCharts
export const WATCH_PRICES: Record<string, Record<string, number>> = {
  'Rolex': {
    'Submariner': 9500,
    'Daytona': 28000,
    'GMT-Master II': 14000,
    'Datejust': 7500,
    'Explorer': 7000,
    'Day-Date': 22000,
  },
  'Patek Philippe': {
    'Nautilus': 45000,
    'Aquanaut': 32000,
    'Calatrava': 18000,
  },
  'Audemars Piguet': {
    'Royal Oak': 28000,
    'Royal Oak Offshore': 22000,
  },
  'Omega': {
    'Speedmaster': 5500,
    'Seamaster': 4200,
    'Constellation': 3500,
  },
  'Cartier': {
    'Santos': 6500,
    'Tank': 5000,
  },
  'IWC': {
    'Portugieser': 7000,
    'Pilot': 4500,
  },
  'Breitling': {
    'Navitimer': 5000,
    'Superocean': 3500,
  },
  'Tudor': {
    'Black Bay': 3200,
    'Pelagos': 3800,
  },
}

// Condition multipliers for watches
export const WATCH_CONDITION_MULTIPLIERS: Record<string, number> = {
  'Excellent': 1.0,
  'Good': 0.85,
  'Fair': 0.70,
}

// Box & papers multipliers for watches
export const WATCH_PAPERS_MULTIPLIERS: Record<string, number> = {
  'Complete Set': 1.0,
  'Box Only': 0.92,
  'Watch Only': 0.85,
}

// CashFlow fee for watches: flat 5%
export const WATCH_FEE_RATE = 0.05

// ─── Diamonds ───────────────────────────────────────────────────────────────
// Diamond approximate wholesale prices per carat (EUR)
// Based on ~1ct round brilliant. Simplified matrix.
// TODO: Replace with Rapaport API or similar
export const DIAMOND_PRICES: Record<string, Record<string, number>> = {
  'D': { 'IF': 16000, 'VVS1': 12000, 'VVS2': 10000, 'VS1': 8500, 'VS2': 7500, 'SI1': 5500, 'SI2': 4000 },
  'E': { 'IF': 13000, 'VVS1': 10500, 'VVS2': 9000, 'VS1': 7500, 'VS2': 6500, 'SI1': 5000, 'SI2': 3500 },
  'F': { 'IF': 11000, 'VVS1': 9000, 'VVS2': 7800, 'VS1': 6500, 'VS2': 5800, 'SI1': 4500, 'SI2': 3200 },
  'G': { 'IF': 8500, 'VVS1': 7200, 'VVS2': 6200, 'VS1': 5500, 'VS2': 4800, 'SI1': 3800, 'SI2': 2800 },
  'H': { 'IF': 7000, 'VVS1': 6000, 'VVS2': 5200, 'VS1': 4500, 'VS2': 4000, 'SI1': 3200, 'SI2': 2400 },
  'I': { 'IF': 5500, 'VVS1': 4800, 'VVS2': 4200, 'VS1': 3600, 'VS2': 3200, 'SI1': 2600, 'SI2': 2000 },
  'J': { 'IF': 4500, 'VVS1': 4000, 'VVS2': 3500, 'VS1': 3000, 'VS2': 2700, 'SI1': 2200, 'SI2': 1700 },
}

// Diamond cut multipliers
export const DIAMOND_CUT_MULTIPLIERS: Record<string, number> = {
  'Excellent': 1.0,
  'Very Good': 0.92,
  'Good': 0.82,
  'Fair': 0.70,
}

// Diamond certificate multipliers
export const DIAMOND_CERT_MULTIPLIERS: Record<string, number> = {
  'GIA': 1.0,
  'IGI': 0.95,
  'HRD': 0.95,
  'None': 0.70,
}

// Diamond size (carat) multipliers - adjusts per-carat price based on stone size
export function getDiamondSizeMultiplier(carats: number): number {
  if (carats < 0.5) return 0.5
  if (carats < 1.0) return 0.75
  if (carats < 1.5) return 1.0
  if (carats < 2.0) return 1.3
  return 1.6
}

// CashFlow fee for stones: flat 7%
export const STONE_FEE_RATE = 0.07

// ─── Shared helpers ──────────────────────────────────────────────────────────
export function formatEur(value: number): string {
  return new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}

export function formatBtc(value: number): string {
  return value.toFixed(6)
}
