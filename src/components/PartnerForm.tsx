'use client'

import { useState } from 'react'

export default function PartnerForm() {
  const [form, setForm] = useState({
    businessName: '',
    city: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.businessName.trim() || !form.city.trim() || !form.email.trim()) {
      setErrorMsg('Business name, city, and email are required.')
      return
    }
    if (!form.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    setErrorMsg('')
    setStatus('loading')

    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ businessName: '', city: '', email: '', phone: '', message: '' })
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
      <div className="text-center animate-fade-in py-8">
        <h3 className="text-xl font-bold text-[#D4AF37] mb-2">Application received.</h3>
        <p className="text-gray-400">We will contact you within 48 hours.</p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-[#0A0A0A] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-600 text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Business name <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="e.g. Oro Milano"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            City <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Milan"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Email <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="contact@yourbusiness.com"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Phone <span className="text-gray-600">(optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+39 02 1234567"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          Message <span className="text-gray-600">(optional)</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us a bit about your business..."
          rows={3}
          className={inputClass + ' resize-none'}
        />
      </div>

      {errorMsg && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#D4AF37] text-black font-bold py-3.5 rounded-lg hover:bg-[#c9a430] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Sending...
          </span>
        ) : 'Apply as Partner'}
      </button>
    </form>
  )
}
