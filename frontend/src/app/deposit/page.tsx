'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { depositsApi, priceApi } from '@/lib/api'
import { ASSET_TYPES, SUPPORTED_CURRENCIES } from '@/lib/constants'

type Step = 1 | 2 | 3

interface DepositForm {
  type: string
  description: string
  estimatedWeight: string
  preferredCurrency: 'USDC' | 'USDT'
  walletAddress: string
}

export default function DepositPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<DepositForm>({
    type: '',
    description: '',
    estimatedWeight: '',
    preferredCurrency: 'USDC',
    walletAddress: '',
  })
  const [photos, setPhotos] = useState<File[]>([])
  // Memoized blob URLs per evitare memory leaks — revocati in cleanup
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const photoUrlsRef = useRef<string[]>([])

  const [goldPricePerGram, setGoldPricePerGram] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Carica prezzo oro per calcolo stimato
    priceApi.gold().then((res) => {
      // 1 troy oz = 31.1035g
      const pricePerGram = res.data.price / 31.1035
      setGoldPricePerGram(pricePerGram)
    }).catch(() => {})
  }, [])

  // Crea e gestisce le blob URL per le anteprime foto
  // Revoca le URL precedenti per prevenire memory leak
  useEffect(() => {
    // Revoca le vecchie URL prima di crearne di nuove
    photoUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    const urls = photos.map((photo) => URL.createObjectURL(photo))
    photoUrlsRef.current = urls
    setPhotoUrls(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [photos])

  const estimatedValue = (): number => {
    if (!goldPricePerGram || !form.estimatedWeight || form.type !== 'gold') return 0
    const weight = parseFloat(form.estimatedWeight)
    if (isNaN(weight)) return 0
    // 18kt = 75% oro puro, spread 15%
    const purityFactor = 0.75
    const spreadFactor = 0.85
    return weight * goldPricePerGram * purityFactor * spreadFactor
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remaining = 5 - photos.length
    setPhotos(prev => [...prev, ...files.slice(0, remaining)])
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }


  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('type', form.type)
      formData.append('description', form.description)
      formData.append('estimatedWeight', form.estimatedWeight)
      formData.append('preferredCurrency', form.preferredCurrency)
      formData.append('walletAddress', form.walletAddress)
      photos.forEach((photo) => formData.append('photos', photo))

      await depositsApi.create(formData)
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Errore durante il deposito'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const canProceedStep1 = form.type && form.description.length >= 10 && parseFloat(form.estimatedWeight) > 0

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Prenota un Deposito</h1>
          <p className="text-gray-400 text-sm">Compila il modulo per iniziare il processo di valutazione</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                s < step ? 'bg-gold text-dark' :
                s === step ? 'bg-gold text-dark' :
                'bg-dark-card border border-white/20 text-gray-500'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 3 && (
                <div className={`h-0.5 w-12 transition-colors ${s < step ? 'bg-gold' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
          <div className="ml-2 text-sm text-gray-500">
            {step === 1 && 'Dettagli Asset'}
            {step === 2 && 'Foto'}
            {step === 3 && 'Conferma'}
          </div>
        </div>

        {/* Step 1 — Dettagli */}
        {step === 1 && (
          <div className="bg-dark-card border border-white/10 rounded-2xl p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo di Oggetto <span className="text-red-400">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
              >
                <option value="">Seleziona tipo...</option>
                {ASSET_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descrizione <span className="text-red-400">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Es. Bracciale in oro giallo 18kt, circa 15 grammi, nessuna pietra, in buone condizioni..."
                rows={4}
                className="w-full bg-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-gold focus:outline-none transition-colors resize-none"
              />
              <p className="text-xs text-gray-600 mt-1">{form.description.length}/500 caratteri (minimo 10)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Peso Stimato (grammi) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={form.estimatedWeight}
                onChange={(e) => setForm(prev => ({ ...prev, estimatedWeight: e.target.value }))}
                placeholder="Es. 15.5"
                min="0.1"
                step="0.1"
                className="w-full bg-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-gold focus:outline-none transition-colors"
              />
              {form.type === 'gold' && estimatedValue() > 0 && (
                <p className="text-xs text-gold mt-1">
                  💰 Valore stimato (18kt, spread 15%): ~€{estimatedValue().toFixed(0)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferenza Pagamento
              </label>
              <div className="flex gap-3">
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <button
                    key={currency}
                    onClick={() => setForm(prev => ({ ...prev, preferredCurrency: currency as 'USDC' | 'USDT' }))}
                    className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors ${
                      form.preferredCurrency === currency
                        ? 'bg-gold text-dark'
                        : 'bg-dark border border-white/20 text-gray-400 hover:border-gold/40'
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Indirizzo Wallet (per ricevere il pagamento)
              </label>
              <input
                type="text"
                value={form.walletAddress}
                onChange={(e) => setForm(prev => ({ ...prev, walletAddress: e.target.value }))}
                placeholder="0x..."
                className="w-full bg-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-gold focus:outline-none transition-colors font-mono text-sm"
              />
              <p className="text-xs text-gray-600 mt-1">Indirizzo Polygon. Se vuoto, usa il wallet connesso.</p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              className="w-full bg-gold hover:bg-gold-light disabled:opacity-40 text-dark font-bold py-4 rounded-xl transition-colors"
            >
              Continua →
            </button>
          </div>
        )}

        {/* Step 2 — Foto */}
        {step === 2 && (
          <div className="bg-dark-card border border-white/10 rounded-2xl p-6 space-y-5">
            <div>
              <h3 className="text-white font-semibold mb-1">Carica le Foto</h3>
              <p className="text-sm text-gray-400 mb-4">
                Carica fino a 5 foto dell&apos;oggetto. Include diverse angolazioni e primo piano di eventuali marchi/punzoni.
              </p>

              {/* Upload area */}
              <label className="block border-2 border-dashed border-white/20 hover:border-gold/40 rounded-xl p-8 text-center cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className="hidden"
                  disabled={photos.length >= 5}
                />
                <div className="text-4xl mb-2">📷</div>
                <p className="text-gray-400 text-sm">
                  Clicca per selezionare foto ({photos.length}/5)
                </p>
                <p className="text-gray-600 text-xs mt-1">PNG, JPG, HEIC — Max 10MB per foto</p>
              </label>

              {/* Preview */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {photos.map((_photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-dark-lighter rounded-lg overflow-hidden">
                        <img
                          src={photoUrls[index]}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-white/20 hover:border-gold/40 text-gray-400 hover:text-white font-semibold py-3 rounded-xl transition-colors"
              >
                ← Indietro
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gold hover:bg-gold-light text-dark font-bold py-3 rounded-xl transition-colors"
              >
                Continua →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Conferma */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-dark-card border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Riepilogo Deposito</h3>

              <div className="space-y-3">
                <Row label="Tipo Oggetto" value={ASSET_TYPES.find(t => t.value === form.type)?.label || form.type} />
                <Row label="Descrizione" value={form.description} />
                <Row label="Peso Stimato" value={`${form.estimatedWeight}g`} />
                <Row label="Pagamento in" value={form.preferredCurrency} />
                <Row label="Wallet" value={form.walletAddress || 'Wallet connesso'} mono />
                <Row label="Foto allegate" value={`${photos.length} foto`} />
              </div>
            </div>

            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
              <p className="text-sm text-yellow-400">
                ⚠️ <strong>Importante:</strong> Il valore indicato è una stima. Il pagamento finale sarà basato sulla perizia professionale del nostro esperto.
              </p>
            </div>

            {error && (
              <div className="bg-red-400/10 border border-red-400/30 rounded-xl p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-white/20 hover:border-gold/40 text-gray-400 hover:text-white font-semibold py-3 rounded-xl transition-colors"
              >
                ← Indietro
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-gold hover:bg-gold-light disabled:opacity-50 text-dark font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                    Invio...
                  </>
                ) : (
                  '✓ Conferma Deposito'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className={`text-sm text-white text-right ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  )
}
