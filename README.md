# Joseph Bezzina & Co Ltd — Corporate Website

Industrial equipment and engineering supplies website for Joseph Bezzina & Co Ltd, Marsa, Malta.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (minimal)
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Logo

Add your company logo as **`public/logo.png`** (see `public/LOGO.md`).  
Until then, the site uses `public/logo.svg` as a temporary wordmark.

## Contact & quote forms

Forms POST to **`/api/enquiry`**. Configure email in `.env.local` (copy from `.env.example`):

- **Resend** — `RESEND_API_KEY` + `ENQUIRY_FROM`
- **SMTP** — `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.
- **Webhook** — `ENQUIRY_WEBHOOK_URL`

Without config, **development** logs enquiries to the terminal; **production** returns an error until configured.

## Domain / SEO

Live site: **http://jbezzina.store** (set via `NEXT_PUBLIC_SITE_URL` in `.env.local`).

## Build

```bash
npm run build
npm start
```

## Pages

- `/` — Home
- `/about` — About
- `/products` — Products catalog
- `/products/fasteners-malta` — Fasteners
- `/products/engineering-tools-malta` — Engineering tools
- `/products/workshop-equipment-malta` — Workshop equipment
- `/contact` — Contact
- `/quote` — Quote request
