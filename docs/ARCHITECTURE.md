# Architettura CashFlow

## Panoramica del Sistema

CashFlow è una piattaforma che collega il mercato tradizionale del "compro oro" con l'ecosistema DeFi, permettendo agli utenti di convertire beni fisici di valore in stablecoin crypto.

```
┌─────────────────────────────────────────────────────────────────┐
│                         UTENTE                                  │
│                    (Browser / Mobile)                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐   │
│  │   Landing   │  │  Dashboard  │  │   Deposit / KYC Form │   │
│  └─────────────┘  └─────────────┘  └──────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  WalletConnect (MetaMask) ← ethers.js → Polygon Network  │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ REST API (JWT Auth)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Express + TypeScript)                │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  /auth   │  │/deposits │  │  /kyc    │  │  /admin      │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │
│  ┌──────────┐  ┌──────────┐                                   │
│  │ /payouts │  │ /price   │                                   │
│  └──────────┘  └──────────┘                                   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   Middleware: JWT Auth │ AML Logger │ Zod Validation     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────────────┐  │
│  │  Auth    │  │ Pricing  │  │  Payout (ethers.js)          │  │
│  │ Service  │  │ Service  │  │  → Polygon → USDC/USDT       │  │
│  └──────────┘  └──────────┘  └──────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   Blockchain Service → mintAsset() → AssetNFT Contract   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────┬──────────────────────────┬────────────────────────┘
              │                          │
              ▼                          ▼
┌─────────────────────┐    ┌─────────────────────────────────────┐
│   PostgreSQL 15     │    │      POLYGON BLOCKCHAIN             │
│   (Prisma ORM)      │    │                                     │
│                     │    │  ┌─────────────────────────────┐   │
│  - User             │    │  │  AssetNFT (ERC-721)          │   │
│  - Deposit          │    │  │  mintAsset() / redeemAsset() │   │
│  - KycDocument      │    │  └─────────────────────────────┘   │
│  - Payout           │    │                                     │
│  - AmlLog           │    │  USDC: 0x2791Bca1...              │
└─────────────────────┘    │  USDT: 0xc2132D0...               │
                           └─────────────────────────────────────┘
                                          │
                           ┌──────────────┴─────────────┐
                           │   EXTERNAL SERVICES        │
                           │                            │
                           │  Gold-API (prezzi LBMA)    │
                           │  Sumsub (KYC/AML)          │
                           └────────────────────────────┘
```

---

## Flusso Deposito End-to-End

### Fase 1: Prenotazione (Utente)

```
1. Utente apre /deposit
2. Compila form: tipo oggetto, descrizione, peso stimato, wallet address
3. Carica foto dell'oggetto (max 5)
4. Frontend → POST /deposits (multipart/form-data + JWT)
5. Backend:
   a. Verifica JWT → ottieni userId
   b. Middleware AML: logga operazione, verifica soglie
   c. Salva deposit con status=PENDING
   d. Risponde con { id, status: "PENDING" }
6. Frontend redirect a /dashboard
```

### Fase 2: Ricezione Fisica (Staff)

```
7. Utente porta/spedisce l'oggetto in sede
8. Admin → PATCH /deposits/:id/status { status: "RECEIVED" }
9. Backend: PENDING → RECEIVED
10. Email notifica all'utente (TODO: email service)
```

### Fase 3: Perizia (Perito)

```
11. Perito esamina l'oggetto fisicamente
12. Admin panel → POST /admin/approve/:id
    - Aggiorna appraisedValue
    - Status: RECEIVED → APPRAISED
13. Admin → POST /admin/mint/:id
    - blockchainService.mintAsset() con metadati
    - AssetNFT.mintAsset(userWallet, metadata)
    - Salva nftTokenId nel DB
```

### Fase 4: Payout Crypto (Automatico)

```
14. POST /payouts/execute { depositId, currency, walletAddress }
15. payoutService:
    a. Verifica deposit.status === APPRAISED
    b. Calcola amount in USDC/USDT
    c. contract.transfer(walletAddress, amount)
    d. Aspetta conferma tx Polygon (1-2 blocchi)
    e. Salva Payout con txHash
    f. Aggiorna deposit.status = PAID
16. Utente riceve stablecoin in <5 minuti
```

---

## Gestione degli Errori

| Scenario | Comportamento |
|----------|---------------|
| JWT scaduto | 401 → Frontend redirect a /login |
| Saldo treasury insufficiente | 422 → Alert admin per ricarica |
| Gold-API down | Usa valori demo / cache |
| Polygon RPC down | 503 → Retry automatico |
| KYC non completato | 403 → Redirect a /kyc |

---

## Sicurezza

- **JWT**: Firmati con HS256, scadenza 7 giorni
- **Password**: bcrypt con salt 12 rounds
- **Rate limiting**: 100 req/15min per IP
- **Helmet**: Headers sicuri (CSP, HSTS, etc.)
- **CORS**: Solo origin frontend autorizzato
- **Chiave privata treasury**: Mai esposta, solo server-side
- **File upload**: Validazione tipo e dimensione, storage isolato
