'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    setErrorMsg('')
    setStatus('loading')
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center animate-fade-in">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">You&apos;re in!</h3>
        <p className="text-gray-400">We&apos;ll notify you when CashFlow launches. Keep an eye on your inbox!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-[#0A0A0A] border border-[#D4AF37]/30 text-white rounded-full px-6 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-600 text-center sm:text-left"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="gold-gradient text-black font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Joining...
            </span>
          ) : 'Join the Waitlist'}
        </button>
      </div>
      {errorMsg && (
        <p className="text-red-400 text-sm mt-2 text-center">{errorMsg}</p>
      )}
      <p className="text-gray-600 text-xs mt-4 text-center">No spam. Unsubscribe anytime.</p>
    </form>
  )
}
