# Compliance AML/KYC — CashFlow Italia

> **Disclaimer**: Questo documento è a scopo informativo. Consulta un avvocato specializzato per la compliance legale della tua attività.

---

## Normativa di Riferimento

| Norma | Descrizione |
|-------|-------------|
| **D.Lgs. 231/2007** | Normativa antiriciclaggio principale (recepisce Direttive UE) |
| **D.Lgs. 92/2017** | Registro OAM per operatori compro oro |
| **D.Lgs. 90/2017** | Aggiornamento AML, definisce VASP |
| **Regolamento MiCA** | Disciplina asset crypto nell'UE (in vigore 2025) |
| **GDPR (EU) 2016/679** | Protezione dati personali |

---

## Checklist Conformità

### ✅ Registrazione e Licenze

- [ ] Costituzione **S.r.l.** con ATECO appropriati
  - `46.72.20` — Commercio all'ingrosso di metalli e minerali metallici
  - `66.19.40` — Attività ausiliarie dei servizi finanziari
- [ ] **Licenza TULPS Art. 127** — Autorizzazione Questura per commercio oggetti preziosi
- [ ] **Iscrizione OAM** — Sezione Compro Oro (D.Lgs. 92/2017)
- [ ] **Iscrizione OAM** — Sezione VASP (Virtual Asset Service Provider)
- [ ] **Nomina Responsabile AML** — Obbligatoria per D.Lgs. 231/2007
- [ ] **Polizza assicurativa** — Copre valore degli asset custoditi

### ✅ KYC (Know Your Customer)

Ogni cliente deve essere identificato prima di effettuare operazioni:

- [ ] Raccolta documento identità valido (CI, Passaporto, Patente)
- [ ] Verifica selfie con documento
- [ ] Verifica indirizzo (utenza, estratto conto) per operazioni > €15.000
- [ ] Registrazione nel Registro della Clientela
- [ ] Conservazione documenti per **10 anni** dalla fine del rapporto

### ✅ AML (Anti-Money Laundering) — Soglie Operative

| Importo | Azione Richiesta |
|---------|-----------------|
| < €1.000 | Operazione standard, solo log |
| €1.000 - €4.999 | KYC completato richiesto |
| **€5.000 - €9.999** | **Verifica rafforzata** (fonte dei fondi) |
| **≥ €10.000** | **Segnalazione UIF obbligatoria** entro 30 giorni |

> Implementazione nel sistema: `src/middleware/aml.middleware.ts`

### ✅ Obblighi di Registrazione (Archivio Unico Informatico)

- [ ] Ogni transazione > €15.000 (o operazioni frazionate) deve essere registrata nell'**AUI**
- [ ] Il database `AmlLog` costituisce la base per questo registro
- [ ] Trasmissione annuale dati all'**UIF** (Unità di Informazione Finanziaria)

### ✅ Travel Rule (FATF/GAFI)

Per trasferimenti crypto > **€1.000**:

- [ ] Raccolta dati ordinante: nome, data nascita, indirizzo wallet
- [ ] Raccolta dati beneficiario: nome, indirizzo wallet
- [ ] Trasmissione dati al VASP destinatario
- [ ] Conservazione record per 5 anni

### ✅ MiCA Compliance (per tokenizzazione NFT)

- [ ] Classificazione NFT come "asset-referenced token" o "utility token"
- [ ] White paper pubblicato se raccolta > €1M
- [ ] Riserva 100% degli asset fisici per ogni token emesso
- [ ] Diritto di rimborso garantito ai detentori

---

## Implementazione Tecnica AML

### Middleware AML (`aml.middleware.ts`)

Il middleware registra ogni operazione finanziaria:

```typescript
// Ogni deposito/payout viene loggato automaticamente
await prisma.amlLog.create({
  data: {
    userId,
    operationType: 'deposit_create',
    amount: importoEUR,
    flagged: importo >= 5000,
    flagReason: importo >= 10000 ? 'UIF_REPORTING_REQUIRED' : null,
  }
})
```

### Soglie Configurabili (`.env`)

```
AML_THRESHOLD_ENHANCED=5000   # Verifica rafforzata in EUR
AML_THRESHOLD_REPORT=10000    # Segnalazione UIF in EUR
```

---

## Procedura Segnalazione Sospetta (SOS)

1. Operazione supera soglia → `flagged = true` nel database
2. Alert automatico via email al Responsabile AML
3. Responsabile valuta entro 24 ore
4. Se confermato sospetto: segnalazione a **UIF** tramite portale
5. **NON** avvisare il cliente (reato di tipping-off)

---

## Conservazione Dati

| Tipo Dato | Durata Conservazione | Sistema |
|-----------|---------------------|---------|
| Documenti KYC | 10 anni | Database + file storage |
| Log AML | 10 anni | Database AmlLog |
| Transazioni | 10 anni | Database Deposit/Payout |
| Log accessi | 2 anni | Sistema logging |

---

## Referenze

- [OAM — Organismo Agenti e Mediatori](https://www.organismo-am.it/)
- [UIF — Unità di Informazione Finanziaria](https://uif.bancaditalia.it/)
- [Banca d'Italia — Antiriciclaggio](https://www.bancaditalia.it/compiti/vigilanza/antiriciclaggio/)
- [ESMA — MiCA Guidelines](https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica)
