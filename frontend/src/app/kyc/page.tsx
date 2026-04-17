'use client'

import { useState, useEffect } from 'react'
import { kycApi } from '@/lib/api'

type KycStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'

const STATUS_CONFIG: Record<KycStatus, { label: string; color: string; description: string; icon: string }> = {
  PENDING: {
    label: 'Non Completato',
    color: 'text-yellow-400',
    description: 'Completa la verifica per poter effettuare depositi',
    icon: '⚠️',
  },
  SUBMITTED: {
    label: 'In Revisione',
    color: 'text-blue-400',
    description: 'I tuoi documenti sono in fase di verifica. Riceverai una email entro 24 ore.',
    icon: '⏳',
  },
  APPROVED: {
    label: 'Verificato',
    color: 'text-green-400',
    description: 'Identità verificata con successo. Puoi effettuare tutti i depositi.',
    icon: '✅',
  },
  REJECTED: {
    label: 'Rifiutato',
    color: 'text-red-400',
    description: 'La verifica è stata rifiutata. Ricarica i documenti oppure contattaci.',
    icon: '❌',
  },
}

export default function KycPage() {
  const [status, setStatus] = useState<KycStatus>('PENDING')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Documenti
  const [docFront, setDocFront] = useState<File | null>(null)
  const [docBack, setDocBack] = useState<File | null>(null)
  const [selfie, setSelfie] = useState<File | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    loadStatus()
  }, [])

  const loadStatus = async () => {
    try {
      const res = await kycApi.getStatus()
      setStatus(res.data.kycStatus)
    } catch {
      // Non autenticato — mostra form
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!docFront || !selfie || !termsAccepted) return

    setSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('docFront', docFront)
      if (docBack) formData.append('docBack', docBack)
      formData.append('selfie', selfie)

      await kycApi.submit(formData)
      setStatus('SUBMITTED')
      setSuccess(true)
    } catch {
      setError('Errore durante l\'invio dei documenti. Riprova.')
    } finally {
      setSubmitting(false)
    }
  }

  const currentStatus = STATUS_CONFIG[status]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Verifica Identità (KYC)</h1>
          <p className="text-gray-400 text-sm">
            Richiesta dalla normativa italiana D.Lgs. 231/2007 per la prevenzione del riciclaggio
          </p>
        </div>

        {/* Status Banner */}
        <div className={`bg-dark-card border rounded-xl p-5 mb-6 ${
          status === 'APPROVED' ? 'border-green-400/30' :
          status === 'REJECTED' ? 'border-red-400/30' :
          status === 'SUBMITTED' ? 'border-blue-400/30' :
          'border-yellow-400/30'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{currentStatus.icon}</span>
            <div>
              <p className={`font-semibold ${currentStatus.color}`}>{currentStatus.label}</p>
              <p className="text-sm text-gray-400 mt-1">{currentStatus.description}</p>
            </div>
          </div>
        </div>

        {/* Se già approvato, mostra solo il banner */}
        {status === 'APPROVED' && (
          <div className="bg-dark-card border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-white mb-2">KYC Completato!</h2>
            <p className="text-gray-400 mb-6">
              La tua identità è stata verificata. Puoi ora effettuare depositi senza limiti.
            </p>
            <a
              href="/deposit"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-dark font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Prenota Deposito →
            </a>
          </div>
        )}

        {/* Se in revisione */}
        {status === 'SUBMITTED' && !success && (
          <div className="bg-dark-card border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-xl font-bold text-white mb-2">Documenti Inviati</h2>
            <p className="text-gray-400">
              Il nostro team verificherà i tuoi documenti entro <strong className="text-white">24 ore</strong>.
              Riceverai una email con l&apos;esito.
            </p>
          </div>
        )}

        {/* Form KYC (PENDING o REJECTED) */}
        {(status === 'PENDING' || status === 'REJECTED') && !success && (
          <form onSubmit={handleSubmit} className="bg-dark-card border border-white/10 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-3">
                Documento di Identità
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Accettiamo: Carta d&apos;Identità, Passaporto, Patente di Guida
              </p>

              {/* Doc Front */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fronte Documento <span className="text-red-400">*</span>
                </label>
                <FileUpload
                  file={docFront}
                  onChange={setDocFront}
                  accept="image/*,.pdf"
                  placeholder="Carica fronte documento"
                />
              </div>

              {/* Doc Back */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Retro Documento <span className="text-gray-500 font-normal">(opzionale per passaporto)</span>
                </label>
                <FileUpload
                  file={docBack}
                  onChange={setDocBack}
                  accept="image/*,.pdf"
                  placeholder="Carica retro documento"
                />
              </div>
            </div>

            {/* Selfie */}
            <div>
              <h3 className="text-white font-semibold mb-1">
                Selfie con Documento <span className="text-red-400">*</span>
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Scatta una foto tenendo il documento accanto al viso. Deve essere chiaramente leggibile.
              </p>
              <FileUpload
                file={selfie}
                onChange={setSelfie}
                accept="image/*"
                placeholder="Carica selfie con documento"
              />
            </div>

            {/* Privacy & Terms */}
            <div className="bg-dark rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-gold"
                />
                <span className="text-sm text-gray-400 leading-relaxed">
                  Accetto il trattamento dei dati personali ai sensi del{' '}
                  <strong className="text-white">Regolamento GDPR (EU) 2016/679</strong> e della normativa
                  antiriciclaggio italiana <strong className="text-white">D.Lgs. 231/2007</strong>.
                  I miei dati saranno utilizzati esclusivamente per la verifica dell&apos;identità.
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-red-400/10 border border-red-400/30 rounded-xl p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!docFront || !selfie || !termsAccepted || submitting}
              className="w-full bg-gold hover:bg-gold-light disabled:opacity-40 text-dark font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                  Invio documenti...
                </>
              ) : (
                '🔒 Invia per Verifica'
              )}
            </button>

            <p className="text-xs text-center text-gray-600">
              I documenti sono trasmessi con crittografia TLS 1.3 e conservati in modo sicuro
            </p>
          </form>
        )}

        {/* Success */}
        {success && (
          <div className="bg-dark-card border border-green-400/30 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-white mb-2">Documenti Inviati!</h2>
            <p className="text-gray-400">
              Verifica completata entro <strong className="text-white">24 ore lavorative</strong>.
              Riceverai una notifica via email.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function FileUpload({
  file,
  onChange,
  accept,
  placeholder,
}: {
  file: File | null
  onChange: (file: File | null) => void
  accept: string
  placeholder: string
}) {
  return (
    <label className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
      file ? 'border-gold/40 bg-gold/5' : 'border-white/20 hover:border-gold/30'
    }`}>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="hidden"
      />
      <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
      <span className={`text-sm truncate ${file ? 'text-gold' : 'text-gray-500'}`}>
        {file ? file.name : placeholder}
      </span>
      {file && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onChange(null) }}
          className="ml-auto text-gray-500 hover:text-red-400 transition-colors"
        >
          ×
        </button>
      )}
    </label>
  )
}
