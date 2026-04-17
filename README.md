# CashFlow 💰

**The first insured gold-to-crypto exchange** — Turn your gold, jewelry, and luxury watches into stablecoins. Swiss-based. Insured. Transparent.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Node.js 18+**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Project Structure

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

## Build & Deploy

```bash
npm run build
npm start
```

Deploy on **Vercel** for free — connect your GitHub repo and it deploys automatically.

## License

© 2024 CashFlow Sagl — Lugano, Switzerland. All rights reserved. 💰

**Compro Oro & Crypto Exchange Platform** — Deposita beni fisici di valore, ricevi criptovalute.

> In costruzione... l'agente sta generando la struttura completa del progetto.
