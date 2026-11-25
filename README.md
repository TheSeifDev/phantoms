# Phantoms Landing

A bilingual, responsive team and studio website for Phantoms. The public site is English-first with an Arabic/RTL switch and dark/light themes. Phase one excludes paid products, courses and checkout.

## Stack

- Next.js App Router, TypeScript and Tailwind CSS 4
- GSAP, ScrollTrigger and Lenis for progressive motion
- Neon Postgres for project inquiries
- Node.js 22 and pnpm 11.25.0

## Run locally

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

The contact endpoint needs `DATABASE_URL`. Configure it as a protected runtime secret; do not commit it to `.env`, Git or deployment build arguments. The optional `NEXT_PUBLIC_SITE_URL` should be set only after the real domain is assigned. Without it, the app omits guessed canonical and absolute social URLs.

## Database

The additive schema is in `drizzle/0001_project_inquiries.sql`. Apply the migration to the intended Neon project before accepting live inquiries:

```sh
pnpm db:migrate
```

This migration creates `project_inquiries` with validated lengths, a service allowlist and a created-at index. The form uses a server-side route, input validation, a honeypot and a small in-process rate limit. It stores an inquiry in Neon; it does not send an email or create a payment.

## Content and assets

- `src/data/site.ts` contains the service and project copy.
- Add only confirmed current team names, biographies and portrait paths to `teamMembers`.
- `public/images/` contains the original-direction hero art and compressed images supplied for the archive. The old team photos are memories, not portraits for the incoming team.

## Public pages

`/`, `/work`, `/work/[slug]`, `/services`, `/team`, `/contact`, `/flagship/rafiq`, and `/flagship/omni`. Unknown case-study slugs return a real 404.
