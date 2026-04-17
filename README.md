# CashFlow 💰

> **Il primo "Compro Oro" che paga in crypto** — Deposita beni fisici di valore (oro, gioielli, orologi) e ricevi stablecoin USDC/USDT direttamente nel tuo wallet in pochi minuti.

**The first insured gold-to-crypto exchange** — Turn your gold, jewelry, and luxury watches into stablecoins. Swiss-based. Insured. Transparent.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-gray.svg)](https://soliditylang.org/)
[![Polygon](https://img.shields.io/badge/Polygon-Mainnet-purple.svg)](https://polygon.technology/)

---

## 🎯 Cos'è CashFlow

CashFlow è una piattaforma che unisce il tradizionale mercato del "compro oro" con la velocità e la trasparenza delle criptovalute:

1. **Prenota il deposito** — Compila il form con tipo oggetto, descrizione e peso stimato
2. **Perizia professionale** — Il nostro perito certifica il valore dell'asset fisico
3. **Ricevi le crypto** — USDC o USDT arrivano nel tuo wallet in pochi minuti
4. **NFT certificato** — Ogni asset depositato riceve un NFT ERC-721 su Polygon come ricevuta digitale

---

## 🛠️ Stack Tecnico

| Layer | Tecnologia |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router) + Tailwind CSS + TypeScript |
| **Backend** | Node.js + Express + TypeScript + Prisma ORM |
| **Database** | PostgreSQL 15 |
| **Smart Contracts** | Solidity 0.8.20 (Foundry) — ERC-721 |
| **Blockchain** | Polygon (MATIC) |
| **Stablecoin** | USDC + USDT su Polygon |
| **KYC** | Sumsub API |
| **Prezzi Oro** | Gold-API (LBMA fixing) |
| **Infra** | Docker Compose |

---

## 🚀 Quick Start

### Waitlist Landing Page

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### Full Stack with Docker Compose

#### Prerequisiti
- Docker + Docker Compose
- Node.js 20+
- (Opzionale) Foundry per smart contracts

```bash
# Clona il repository
git clone https://github.com/aletheiamanifesto-pixel/CashFlow.git
cd CashFlow

# Copia le variabili d'ambiente
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Avvia tutti i servizi
docker-compose up -d

# Esegui le migration del database
docker-compose exec backend npx prisma migrate dev

# Carica i dati di test
docker-compose exec backend npm run db:seed
```

Servizi disponibili:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health
- **Prisma Studio**: `docker-compose exec backend npm run db:studio`

### Sviluppo Locale (Backend)

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Modifica .env con le tue credenziali
npx prisma migrate dev
npx prisma db seed
npm run dev  # avvia su porta 4000
```

---

## 📁 Struttura Progetto (Landing Page)

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # POST /api/waitlist — saves emails to data/waitlist.json
│   ├── globals.css
│   ├── layout.tsx             # SEO metadata, fonts
│   └── page.tsx               # Main landing page
├── components/
│   ├── FAQ.tsx                # Accordion FAQ
│   ├── Footer.tsx             # Site footer
│   ├── GoldEstimator.tsx      # Interactive price calculator
│   ├── HowItWorks.tsx         # 3-step flow
│   ├── Navbar.tsx             # Sticky navigation
│   ├── PriceWidget.tsx        # Live gold price (mock)
│   ├── TrustBadges.tsx        # Trust indicators
│   └── WaitlistForm.tsx       # Email capture form
data/
└── waitlist.json              # Waitlist submissions (MVP storage)
```

## Waitlist Storage

In development/MVP mode, waitlist submissions are stored in `data/waitlist.json`. For production, integrate with:

- **Formspree**: Set `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local`
- **EmailOctopus** / **Mailchimp** API
- **PostgreSQL** via Prisma

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Descrizione |
|--------|----------|-------------|
| `POST` | `/auth/register` | Registrazione nuovo utente |
| `POST` | `/auth/login` | Login con email/password |
| `GET` | `/auth/me` | Profilo utente autenticato |

### Depositi
| Method | Endpoint | Descrizione |
|--------|----------|-------------|
| `POST` | `/deposits` | Crea nuovo deposito |
| `GET` | `/deposits` | Lista depositi utente |
| `GET` | `/deposits/:id` | Dettaglio deposito |
| `PATCH` | `/deposits/:id/status` | Aggiorna stato (admin) |

### KYC
| Method | Endpoint | Descrizione |
|--------|----------|-------------|
| `POST` | `/kyc/submit` | Invia documenti KYC |
| `GET` | `/kyc/status` | Stato verifica KYC |

### Prezzi
| Method | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/price/gold` | Prezzo oro in tempo reale |
| `GET` | `/price/silver` | Prezzo argento in tempo reale |

### Admin
| Method | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/admin/deposits` | Tutti i depositi (admin) |
| `POST` | `/admin/approve/:id` | Approva deposito |
| `POST` | `/admin/mint/:id` | Minta NFT per deposito |

### Payout
| Method | Endpoint | Descrizione |
|--------|----------|-------------|
| `POST` | `/payouts/execute` | Esegui payout crypto |

---

## 📜 Smart Contracts

### AssetNFT (ERC-721)

Contract su Polygon che tokenizza ogni asset fisico depositato.

```bash
# Installazione dipendenze
cd contracts
forge install OpenZeppelin/openzeppelin-contracts

# Compilazione
forge build

# Test
forge test -v

# Deploy (richiede .env con chiavi)
forge script script/Deploy.s.sol --rpc-url polygon --broadcast
```

**Funzioni principali:**
- `mintAsset(address to, AssetMetadata data)` — Minta NFT (solo APPRAISER)
- `redeemAsset(uint256 tokenId)` — Brucia NFT e riscatta asset fisico
- `getAssetMetadata(uint256 tokenId)` — Recupera metadati asset

---

## 🏛️ Compliance Legale (Italia)

Per operare legalmente in Italia sono richiesti:

| Requisito | Ente | Tempistiche |
|-----------|------|-------------|
| Costituzione S.r.l. | Notaio | 2-4 settimane |
| Licenza TULPS Art. 127 | Questura | 1-3 mesi |
| Iscrizione OAM Compro Oro | OAM | 1-2 mesi |
| Iscrizione OAM VASP | OAM | 2-4 mesi |
| Responsabile AML | Interno | Immediato |
| Assicurazione caveau | Broker | 1-2 settimane |

⚠️ **Questo software non costituisce consulenza legale.** Consulta un avvocato specializzato prima dell'avvio dell'attività.

---

## 🗺️ Roadmap

- [x] **MVP** — Frontend + Backend + Smart Contract base
- [x] **Waitlist Landing Page** — Next.js 15 landing page with email capture
- [ ] **v1.1** — Integrazione Sumsub KYC
- [ ] **v1.2** — Pannello admin completo con gestione perizie
- [ ] **v1.3** — Mobile app (React Native)
- [ ] **v2.0** — DeFi lending con NFT come collaterale
- [ ] **v2.1** — Marketplace secondario per asset tokenizzati

---

## 📄 Documentazione

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Architettura del sistema
- [`docs/AML-COMPLIANCE.md`](docs/AML-COMPLIANCE.md) — Conformità AML/KYC
- [`docs/API.md`](docs/API.md) — Documentazione API completa
- [`docs/BUSINESS-MODEL.md`](docs/BUSINESS-MODEL.md) — Modello di business

---

## 📝 Licenza

MIT License — vedi [LICENSE](LICENSE) per dettagli.

© 2024 CashFlow Sagl — Lugano, Switzerland. All rights reserved. 💰

---

*Built with ❤️ in Italy 🇮🇹*

