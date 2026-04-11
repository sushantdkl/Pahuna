# Pahuna — Karnali Awaits

> Nepal's first integrated tourism platform for Karnali Province. Premium stays, authentic experiences, B2B consulting & hospitality training.

Built with Next.js 16, Prisma 7, Tailwind CSS v4, and shadcn/ui.

## Features

- **Hotel Discovery** — Browse, filter, and inquire about hotels in Surkhet
- **Tourism Planning** — Trip cost estimator, itineraries, packages, transport info
- **B2B Consulting** — Hospitality consulting services with lead capture
- **Training Academy** — Professional hospitality training enrollment
- **Admin Dashboard** — Manage leads, partners, hotels, training, and consulting
- **SEO Optimized** — Sitemap, robots.txt, Open Graph, structured metadata

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| Database | PostgreSQL + Prisma 7 (PrismaPg adapter) |
| Styling | Tailwind CSS v4, shadcn/ui (new-york) |
| Auth | NextAuth.js 4 (JWT strategy, credentials) |
| Forms | React Hook Form + Zod validation |
| Icons | Lucide React |
| Toasts | Sonner |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ (local or hosted: Neon, Supabase, etc.)

### 1. Clone & Install

```bash
git clone <repo-url>
cd surkhet-hotel
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | **Yes** | PostgreSQL connection string (use pooled URL for serverless) |
| `NEXTAUTH_SECRET` | **Yes** | Random secret, min 32 chars. Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Yes** | `http://localhost:3000` (dev) or `https://yourdomain.com` (prod) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 Measurement ID |
| `RESEND_API_KEY` | No | Transactional email provider (Phase 2) |

### 2.1 Maps

Pahuna uses **Leaflet + react-leaflet** with **OpenStreetMap (Carto light tiles)** for all interactive maps (hotels, experiences, explore, itineraries, trip cost). No API keys are required for maps.

### 3. Database Setup

```bash
# Push schema to database (creates tables)
npm run db:push

# Run migrations (for production / CI)
npm run db:migrate

# Seed demo data (5 admin users, 6 hotels, destinations, courses, etc.)
npm run db:seed
```

**Default admin credentials** (seeded):

| Email | Password | Role |
|-------|----------|------|
| `admin@surkhethotel.com` | `password123` | ADMIN |
| `editor@surkhethotel.com` | `password123` | EDITOR |

> **Important:** Change all seeded passwords before going to production.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database

### Schema Overview

```
Country → Region → City → Hotel, Destination, Experience
                        → Itinerary, TrainingCourse, ConsultingService
                        → TripPackage, TransportRoute, FAQ, Testimonial
                        → BlogPost

User (admin/editor/partner roles)
Inquiry, ContactMessage, CallbackRequest
PartnerApplication, HotelLead
ConsultingLead, TrainingEnrollment
NewsletterSubscriber
```

Full schema: `prisma/schema.prisma` (912 lines)

### Migration Commands

| Command | Purpose |
|---------|---------|
| `npm run db:push` | Push schema changes to DB (dev) |
| `npm run db:migrate` | Apply migrations (production) |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset DB and re-seed |

### Seed Data

The seed script (`prisma/seed.ts`) creates:
- 1 Country (Nepal), 1 Region (Karnali), 1 City (Surkhet)
- 6 Hotels with images, amenities, and pricing
- 5 Destinations, 5 Experiences, 2 Itineraries
- 6 Training Courses, 7 Consulting Services, 3 Case Studies
- 6 Trip Packages, 6 Transport Routes
- 15 FAQs, 12 Testimonials, 3 Blog Posts
- 5 Admin/Editor users

---

## Build & Deploy

### Build Command

```bash
npm run build
```

This runs `prisma generate && next build` — generates the Prisma client then builds all 61 static pages.

### Deploy to Vercel

#### Option A: Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables (see table above)
5. Deploy — Vercel auto-detects Next.js

#### Option B: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Vercel Environment Variables

In **Vercel Dashboard → Settings → Environment Variables**, add:

```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
NEXTAUTH_SECRET=<your-32-char-secret>
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> **Database:** Use a serverless-compatible PostgreSQL provider:
> - [Neon](https://neon.tech) (recommended — free tier, pooled connections)
> - [Supabase](https://supabase.com)
> - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

### Post-Deployment Checklist

- [ ] Verify `DATABASE_URL` uses **pooled** connection string (for serverless)
- [ ] Verify `NEXTAUTH_SECRET` is a strong random value (not the default)
- [ ] Verify `NEXTAUTH_URL` matches your production domain
- [ ] Run `npm run db:migrate` against production DB
- [ ] Run `npm run db:seed` to populate demo data (or skip for clean start)
- [ ] Change default admin passwords (`password123`)
- [ ] Test all forms: contact, inquiry, callback, partner, hotel-lead, consulting, training, newsletter
- [ ] Test admin login at `/login` and dashboard at `/dashboard`
- [ ] Verify Google Analytics tracking (if `NEXT_PUBLIC_GA_ID` is set)
- [ ] Test image loading from Unsplash (allowed in `next.config.ts`)
- [ ] Check security headers: `X-Frame-Options`, `Strict-Transport-Security`, etc.
- [ ] Verify sitemap at `/sitemap.xml` and robots at `/robots.txt`
- [ ] Set up custom domain in Vercel (optional)
- [ ] Enable Vercel Analytics and Speed Insights (optional)

---

## Project Structure

```
src/
├── actions/          # Server actions (8 form handlers)
├── app/              # Next.js App Router pages
│   ├── dashboard/    # Protected admin routes
│   ├── hotels/       # Hotel listing & detail pages
│   ├── training/     # Training academy pages
│   ├── consulting/   # B2B consulting pages
│   └── ...           # Blog, packages, itineraries, etc.
├── components/
│   ├── layout/       # Header, Footer, Container
│   ├── hotels/       # Hotel cards, filters, listings
│   ├── tourism/      # Trip cost, transport, packages
│   ├── consulting/   # Service cards, CTAs
│   ├── training/     # Course cards, enrollment
│   ├── forms/        # All 8 form components
│   ├── dashboard/    # Admin UI components
│   ├── shared/       # Reusable components
│   └── ui/           # shadcn/ui primitives
├── data/             # Static content data
├── lib/              # Utilities, config, types, auth
├── services/         # Content service layer
│   ├── phase2/       # Future service interfaces
│   └── index.ts      # Barrel export
prisma/
├── schema.prisma     # Database schema (912 lines)
├── seed.ts           # Demo data seeder (517 lines)
└── migrations/       # Prisma migrations
```

---

## Phase 1 (Current) — Lead Generation Platform

- Static hotel listings with inquiry forms
- Tourism content (destinations, experiences, itineraries, trip cost)
- B2B consulting lead capture
- Training academy enrollment
- Admin dashboard for lead management
- Email confirmation templates (console-logged, ready for provider)

## Phase 2 (Planned)

- [ ] Real-time booking engine with availability calendar
- [ ] Payment integration (Khalti, eSewa, Stripe)
- [ ] Commission tracking and partner scoring
- [ ] Review and rating system
- [ ] Resend/SendGrid email integration
- [ ] Dynamic pricing engine
- [ ] Channel management (OTA sync)
- [ ] Franchise expansion model

---

## License

Private — All rights reserved.
