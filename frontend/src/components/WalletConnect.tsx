'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { ACTIVE_CHAIN_ID } from '@/lib/constants'

interface WalletState {
  address: string | null
  chainId: number | null
  isConnecting: boolean
  error: string | null
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, handler: (...args: unknown[]) => void) => void
    }
  }
}

export default function WalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnecting: false,
    error: null,
  })

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window === 'undefined' || !window.ethereum) return
    try {
      const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider)
      const accounts = await provider.listAccounts()
      if (accounts.length > 0) {
        const network = await provider.getNetwork()
        setWallet({
          address: accounts[0].address,
          chainId: Number(network.chainId),
          isConnecting: false,
          error: null,
        })
      }
    } catch {
      // wallet non connesso, ignora l'errore
    }
  }

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setWallet(prev => ({ ...prev, error: 'MetaMask non installato. Installa MetaMask per continuare.' }))
      return
    }

    setWallet(prev => ({ ...prev, isConnecting: true, error: null }))

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider)
      await provider.send('eth_requestAccounts', [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const network = await provider.getNetwork()

      // Suggerisci switch a Polygon se su altra rete
      if (Number(network.chainId) !== ACTIVE_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${ACTIVE_CHAIN_ID.toString(16)}` }],
          })
        } catch {
          // L'utente ha rifiutato il cambio rete — continua comunque
        }
      }

      setWallet({
        address,
        chainId: Number(network.chainId),
        isConnecting: false,
        error: null,
      })
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Errore connessione wallet'
      setWallet(prev => ({ ...prev, isConnecting: false, error: msg }))
    }
  }

  const disconnect = () => {
    setWallet({ address: null, chainId: null, isConnecting: false, error: null })
  }

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  if (wallet.address) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-dark-card border border-gold/30 rounded-lg px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-mono text-gold">{formatAddress(wallet.address)}</span>
          {wallet.chainId !== ACTIVE_CHAIN_ID && (
            <span className="text-xs text-red-400">Rete errata</span>
          )}
        </div>
        <button
          onClick={disconnect}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Disconnetti
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={connectWallet}
        disabled={wallet.isConnecting}
        className="flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-semibold px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
      >
        {wallet.isConnecting ? (
          <>
            <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
            Connessione...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
            </svg>
            Connetti Wallet
          </>
        )}
      </button>
      {wallet.error && (
        <p className="text-xs text-red-400 mt-1 max-w-xs">{wallet.error}</p>
      )}
    </div>
  )
}
