# API Reference — CashFlow Backend

Base URL: `http://localhost:4000`

Autenticazione: `Authorization: Bearer <token>`

---

## Auth

### POST /auth/register

Registra un nuovo utente.

**Request:**
```json
{
  "email": "mario.rossi@gmail.com",
  "password": "SecurePass123!",
  "walletAddress": "0x1234567890123456789012345678901234567890"
}
```

**Response 201:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx1234...",
    "email": "mario.rossi@gmail.com",
    "role": "USER",
    "kycStatus": "PENDING"
  }
}
```

**Errori:**
- `409` — Email già registrata

---

### POST /auth/login

Login con email e password.

**Request:**
```json
{
  "email": "mario.rossi@gmail.com",
  "password": "SecurePass123!"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx1234...",
    "email": "mario.rossi@gmail.com",
    "role": "USER",
    "kycStatus": "APPROVED"
  }
}
```

**Errori:**
- `401` — Credenziali non valide

---

### GET /auth/me

Profilo utente autenticato.

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "id": "clx1234...",
  "email": "mario.rossi@gmail.com",
  "walletAddress": "0x1234...",
  "kycStatus": "APPROVED",
  "role": "USER",
  "createdAt": "2026-01-15T10:00:00.000Z",
  "_count": {
    "deposits": 3
  }
}
```

---

## Depositi

### POST /deposits

Crea una nuova prenotazione di deposito.

**Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`

**Form Data:**
```
type: "gold"
description: "Bracciale in oro 18kt, circa 15 grammi"
estimatedWeight: "15.5"
preferredCurrency: "USDC"
walletAddress: "0x1234..." (opzionale)
photos: [File, File, ...] (max 5 file)
```

**Response 201:**
```json
{
  "id": "clx5678...",
  "userId": "clx1234...",
  "type": "gold",
  "description": "Bracciale in oro 18kt, circa 15 grammi",
  "estimatedWeight": 15.5,
  "estimatedValue": 0,
  "status": "PENDING",
  "preferredCurrency": "USDC",
  "photos": ["/uploads/deposits/1234567890.jpg"],
  "createdAt": "2026-01-15T10:00:00.000Z"
}
```

---

### GET /deposits

Lista tutti i depositi dell'utente autenticato.

**Response 200:**
```json
[
  {
    "id": "clx5678...",
    "type": "gold",
    "description": "Bracciale in oro 18kt",
    "estimatedWeight": 15.5,
    "estimatedValue": 1200,
    "appraisedValue": 1150,
    "status": "APPRAISED",
    "nftTokenId": "42",
    "preferredCurrency": "USDC",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "payout": null
  }
]
```

---

### PATCH /deposits/:id/status

Aggiorna lo stato di un deposito.

**Roles richiesti:** ADMIN, APPRAISER

**Request:**
```json
{
  "status": "RECEIVED"
}
```

**Transizioni valide:**
- `PENDING` → `RECEIVED`, `REJECTED`
- `RECEIVED` → `APPRAISED`, `REJECTED`
- `APPRAISED` → `PAID`, `REJECTED`

---

## KYC

### POST /kyc/submit

Invia documenti per la verifica KYC.

**Headers:** `Content-Type: multipart/form-data`

**Form Data:**
```
docFront: File  (obbligatorio)
docBack: File   (opzionale per passaporto)
selfie: File    (obbligatorio)
```

**Response 201:**
```json
{
  "message": "Documenti ricevuti. Verifica in corso entro 24 ore.",
  "status": "SUBMITTED"
}
```

---

### GET /kyc/status

Stato verifica KYC dell'utente corrente.

**Response 200:**
```json
{
  "kycStatus": "APPROVED",
  "documentsSubmitted": true,
  "lastSubmission": "2026-01-10T08:00:00.000Z"
}
```

---

## Prezzi

### GET /price/gold

Prezzo oro in tempo reale (fonte: Gold-API / LBMA).

**Response 200:**
```json
{
  "price": 2350.50,
  "currency": "USD",
  "unit": "troy oz",
  "timestamp": "2026-01-15T10:00:00.000Z",
  "change24h": 0.42
}
```

---

### GET /price/silver

Prezzo argento in tempo reale.

**Response 200:**
```json
{
  "price": 29.85,
  "currency": "USD",
  "unit": "troy oz",
  "timestamp": "2026-01-15T10:00:00.000Z",
  "change24h": -0.18
}
```

---

## Payout

### POST /payouts/execute

Esegui il payout crypto per un deposito periziato.

**Roles richiesti:** ADMIN, APPRAISER

**Request:**
```json
{
  "depositId": "clx5678...",
  "currency": "USDC",
  "walletAddress": "0x1234567890123456789012345678901234567890"
}
```

**Response 200:**
```json
{
  "txHash": "0xabcd1234...",
  "amount": 1150.00,
  "currency": "USDC",
  "payout": {
    "id": "clx9012...",
    "depositId": "clx5678...",
    "amount": 1150.00,
    "currency": "USDC",
    "txHash": "0xabcd1234...",
    "walletAddress": "0x1234...",
    "status": "COMPLETED"
  }
}
```

---

## Admin

### GET /admin/deposits

Lista tutti i depositi (tutti gli utenti).

**Roles richiesti:** ADMIN, APPRAISER

**Response 200:**
```json
[
  {
    "id": "clx5678...",
    "type": "gold",
    "status": "RECEIVED",
    "estimatedWeight": 15.5,
    "estimatedValue": 1200,
    "user": {
      "id": "clx1234...",
      "email": "mario.rossi@gmail.com",
      "walletAddress": "0x1234...",
      "kycStatus": "APPROVED"
    }
  }
]
```

---

### POST /admin/approve/:id

Approva ricezione deposito (PENDING → RECEIVED).

**Response 200:**
```json
{
  "message": "Deposito approvato",
  "deposit": { "id": "...", "status": "RECEIVED" }
}
```

---

### POST /admin/mint/:id

Minta NFT per un deposito ricevuto/periziato.

**Request (opzionale):**
```json
{
  "recipientAddress": "0x1234..." 
}
```

**Response 200:**
```json
{
  "message": "NFT mintato con successo",
  "txHash": "0xabcd...",
  "tokenId": "42"
}
```

---

## Health Check

### GET /health

**Response 200:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-15T10:00:00.000Z",
  "version": "1.0.0",
  "env": "production"
}
```

---

## Codici di Errore

| Codice | Significato |
|--------|-------------|
| `400` | Dati non validi (validation error) |
| `401` | Token mancante o scaduto |
| `403` | Permessi insufficienti |
| `404` | Risorsa non trovata |
| `409` | Conflitto (es. email duplicata) |
| `422` | Business rule violation |
| `429` | Rate limit superato |
| `500` | Errore interno server |
| `503` | Servizio esterno non disponibile |
