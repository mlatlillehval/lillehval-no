This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Kom i gang

Kopier miljøvariabler og fyll inn verdier (se `.env.example`):

```bash
cp .env.example .env.local
```

Start utviklingsserveren:

```bash
npm run dev
```

Åpne **http://127.0.0.1:3000** i nettleseren (samme vert som `npm run dev` bruker).

### Feilsøking

- **«Kan ikke koble til» / blank side:** Sjekk terminalen etter `npm run dev` — hvis port 3000 er opptatt, prøver Next automatisk 3001, 3002, … og viser riktig URL der. Stopp andre `next dev`-prosesser eller kjør `lsof -i :3000` og avslutt prosessen som ligger der.
- **`localhost` vs `127.0.0.1`:** Dev-serveren er satt til `127.0.0.1` for å unngå kjente problemer med Next som leser nettverksgrensesnitt (kan feile i noen miljøer). Bruk alltid URL-en terminalen skriver ut.
- **Supabase:** Uten `NEXT_PUBLIC_SUPABASE_URL` og anon-nøkkel i `.env.local` fungerer forsiden med standardtekst, men innlogging og admin krever Supabase.

### Produksjon (www.lillehval.no + www.lillehval.ai)

1. I **Vercel** → prosjektet → **Domains**: legg til begge `www.lillehval.no` og `www.lillehval.ai` (DNS som Vercel viser).
2. I **Vercel** → **Settings** → **Environment Variables** (Production), sett **`NEXT_PUBLIC_SITE_URL`** til `https://www.lillehval.no` (brukes som kanonisk base for metadata, sitemap og Stripe-retur).
3. I **Supabase** → Authentication → URL Configuration: tillat redirect for begge domener (se `.env.example`).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
