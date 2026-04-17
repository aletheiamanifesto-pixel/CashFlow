'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

interface FormData {
  businessName: string
  contactName: string
  email: string
  phone: string
  city: string
  country: string
  monthlyVolume: string
  message: string
}

const INITIAL_FORM: FormData = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  monthlyVolume: '',
  message: '',
}

export default function PartnerForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!form.businessName.trim()) {
      setErrorMsg('Business name is required.')
      return
    }
    if (!form.contactName.trim()) {
      setErrorMsg('Contact name is required.')
      return
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    if (!form.city.trim()) {
      setErrorMsg('City is required.')
      return
    }
    if (!form.country) {
      setErrorMsg('Please select your country.')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm(INITIAL_FORM)
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
      <div className="text-center animate-fade-in py-12">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-[#D4AF37]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Application Submitted</h3>
        <p className="text-gray-400 max-w-sm mx-auto">
          Thank you. We&apos;ll review your application and get back to you within 48 hours.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-600 text-sm'
  const labelClass = 'block text-sm text-gray-400 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="businessName" className={labelClass}>
            Business Name <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            value={form.businessName}
            onChange={handleChange}
            required
            placeholder="Oro Milano Srl"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contactName" className={labelClass}>
            Contact Name <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            value={form.contactName}
            onChange={handleChange}
            required
            placeholder="Marco Rossi"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="marco@oromilano.it"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-gray-600 text-xs">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+39 02 1234567"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="city" className={labelClass}>
            City <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            required
            placeholder="Milan"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>
            Country <span className="text-[#D4AF37]">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="" disabled>Select country</option>
            <option value="Italy">Italy</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="monthlyVolume" className={labelClass}>
          Monthly Gold Volume <span className="text-gray-600 text-xs">(optional)</span>
        </label>
        <select
          id="monthlyVolume"
          name="monthlyVolume"
          value={form.monthlyVolume}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Prefer not to say</option>
          <option value="Under €10k">Under €10k</option>
          <option value="€10k–€50k">€10k–€50k</option>
          <option value="€50k–€200k">€50k–€200k</option>
          <option value="Over €200k">Over €200k</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-gray-600 text-xs">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your business or any questions you have..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {errorMsg && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full gold-gradient text-black font-bold py-4 rounded-xl hover:opacity-90 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Application'
        )}
      </button>

      <p className="text-gray-600 text-xs text-center">
        By submitting you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  )
}
