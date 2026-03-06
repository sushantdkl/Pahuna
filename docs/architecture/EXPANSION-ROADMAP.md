# Expansion Roadmap — OYO-Like Platform Architecture
## Surkhet Hotel & Tourism Platform

> **Design Principle**: Build the minimum viable platform first, then expand.
> Each phase adds capabilities without rewriting what came before.

---

## Current State: Phase 1 (Complete)

**What exists today:**

| Domain | Status | Notes |
|--------|--------|-------|
| Geography | ✅ Country → Region → City | Multi-city ready from day 1 |
| Hotels | ✅ Listings with images, amenities | Indicative pricing only (priceMin/priceMax) |
| Room Types | ✅ Schema exists (RoomType model) | Not actively used — placeholder for Phase 2 |
| Inquiries | ✅ Lead capture | Hotel booking inquiries, callback requests |
| Partners | ✅ Application form | Manual review workflow |
| Training | ✅ Courses + enrollments | Full training academy |
| Consulting | ✅ Services + leads + case studies | B2B consulting pipeline |
| Blog/Content | ✅ Blog posts + CMS-ready | Content management foundation |
| Auth | ✅ 5 roles, NextAuth + JWT | Role-based dashboard |
| Service Layer | ✅ Passthrough pattern | Static data → Prisma swap-ready |

**Phase 1 Architecture Decisions That Enable Expansion:**

1. **Service layer abstraction** — Pages call `getHotels()`, not Prisma directly. Swap internals without touching UI.
2. **Content type system** — `src/lib/types/content.ts` defines display shapes separate from DB models.
3. **Booking types pre-defined** — `src/lib/types/booking.ts` already has Room, Availability, Booking, Payment, Commission, Review interfaces.
4. **Multi-city geography** — Country/Region/City hierarchy exists. Adding Pokhara = one City record.
5. **Role system extensible** — `UserRole` enum + `ROLE_PERMISSIONS` map. Adding `FRANCHISE_MANAGER` = one enum value + one permission set.
6. **Hotel model has extension points** — `isVerified`, `status` workflow, `createdBy`/`updatedBy` audit fields.
7. **Partner application pipeline** — `PENDING → UNDER_REVIEW → APPROVED → REJECTED` status flow.

---

## Phase 2: Booking Engine & Partner Standardization
**Timeline**: 3-6 months after Phase 1 launch
**Goal**: Transform from lead-gen to transactional platform

### 2A — Partner Standardization & Scoring

**Problem**: Hotels are listed manually. No quality assurance, no partner accountability.

**What to build:**
- `HotelPartner` join model — link User accounts to Hotel records with permissions
- `QualityScore` model — 6-dimension scoring (cleanliness, amenity accuracy, photo accuracy, safety, satisfaction, response time)
- `QualityAudit` model — field audit records with photos and findings
- Partner tier system: BASIC → STANDARD → PREMIUM → ELITE
- Partner self-service dashboard: update photos, respond to inquiries, view their score

**Schema changes:**
- Add `HotelPartner`, `QualityScore`, `QualityAudit` models (see `schema.future.prisma`)
- Add `partnerId` to `Hotel` model (optional, backward-compatible)
- Add `FINANCE` to `UserRole` enum

**Service layer:**
- `src/services/partners.ts` — partner CRUD, scoring queries
- `src/services/quality.ts` — audit scheduling, score calculation

**Dashboard changes:**
- `/dashboard/hotels/[id]` — partner view: edit rooms, photos, pricing
- `/dashboard/quality` — admin view: audit queue, score reports

### 2B — Room Inventory & Availability

**Problem**: Hotels show price ranges, not bookable rooms. No real-time availability.

**What to build:**
- Activate existing `RoomType` model — add `isActive`, `sortOrder`, link to availability
- `RoomAvailability` calendar model — daily inventory per room type
- Availability check API: given dates + guests → available room types with prices
- Partner tool: bulk availability management (calendar UI)

**Schema changes:**
- Enhance `RoomType` with `isActive`, `sortOrder`
- Add `RoomAvailability` model
- Add indexes on `[roomTypeId, date]`

**Service layer:**
- `src/services/availability.ts` — check availability, update calendar
- `src/services/rooms.ts` — room type CRUD

**UI changes:**
- Hotel detail page: room picker with live availability
- Partner dashboard: calendar grid for managing availability

### 2C — Pricing Rules

**Problem**: Static pricing doesn't respond to demand, seasons, or promotions.

**What to build:**
- `PricingRule` model — seasonal, day-of-week, early-bird, last-minute, occupancy-based
- Price calculation engine: stack rules by priority, apply constraints
- Partner UI for managing their own pricing rules

**Schema changes:**
- Add `PricingRule` model

**Service layer:**
- `src/services/pricing.ts` — calculate effective price for room + date combo

### 2D — Booking Engine

**Problem**: Inquiries don't convert to confirmed, trackable bookings.

**What to build:**
- `Booking` + `BookingItem` models — full booking lifecycle
- Booking flow: Search → Select Room → Guest Details → Payment → Confirmation
- Booking confirmation emails (extend existing email system)
- Booking management for guests (view, cancel)
- Partner view: incoming bookings, confirm/reject

**Schema changes:**
- Add `Booking`, `BookingItem` models
- Add `bookingId` to existing `Inquiry` (link inquiry → booking)
- Add `bookings` relation to `Hotel`

**Service layer:**
- `src/services/bookings.ts` — create, confirm, cancel, list
- `src/lib/booking-engine.ts` — orchestrator: availability check → price calc → booking creation

**API routes:**
- `POST /api/bookings` — create booking
- `GET /api/bookings/[id]` — booking details
- `PATCH /api/bookings/[id]` — update status

### 2E — Payment Integration

**Problem**: No online payment capability. Nepal has eSewa, Khalti, ConnectIPS.

**What to build:**
- `Payment` model — tracks all payment attempts and outcomes
- Payment gateway integrations: eSewa, Khalti (start with these two)
- Payment verification webhooks
- Refund processing
- Cash-on-arrival option (mark as paid at check-in)

**Schema changes:**
- Add `Payment` model

**Service layer:**
- `src/services/payments.ts` — create intent, verify, refund
- `src/lib/payment-gateways/esewa.ts` — eSewa SDK integration
- `src/lib/payment-gateways/khalti.ts` — Khalti SDK integration
- `src/lib/payment-gateways/gateway.ts` — abstract gateway interface

**API routes:**
- `POST /api/payments/initiate` — start payment
- `POST /api/payments/verify` — verify callback
- `POST /api/webhooks/esewa` — eSewa webhook
- `POST /api/webhooks/khalti` — Khalti webhook

### 2F — Commission System

**Problem**: Platform needs revenue. Commission on bookings is the model.

**What to build:**
- `CommissionRule` per hotel (default + custom rates)
- `Commission` model — per-booking commission tracking
- `CommissionPayout` — monthly settlement reports
- Finance dashboard: commission overview, payout management

**Schema changes:**
- Add `CommissionRule`, `Commission`, `CommissionPayout` models
- Add `FINANCE` role to `UserRole`

**Service layer:**
- `src/services/commissions.ts` — calculate, track, generate payouts

### 2G — Guest Reviews

**Problem**: No social proof. Reviews drive booking decisions.

**What to build:**
- `GuestReview` model — post-stay reviews linked to verified bookings
- Review moderation workflow (admin approves before publish)
- Hotel response capability
- Average rating calculation and display on hotel cards

**Schema changes:**
- Add `GuestReview` model

**Service layer:**
- `src/services/reviews.ts` — create, moderate, aggregate ratings

---

## Phase 3: Growth & Optimization
**Timeline**: 6-12 months after Phase 2
**Goal**: Scale operations, optimize revenue, build brand

### 3A — Franchise / Managed-Property Model

**Problem**: Need deeper partnerships beyond listing. Hotels want help running better.

**What to build:**
- `FranchiseAgreement` model — contract terms, brand tier, financial terms
- `BrandStandard` model — requirements checklist per brand tier
- Brand tiers: Surkhet Stays (budget), Surkhet Select (mid), Surkhet Premium (upscale)
- Franchise onboarding workflow
- Compliance tracking against brand standards

**Business model options:**
| Model | Description | Revenue |
|-------|-------------|---------|
| **Franchise** | Hotel uses our brand, follows standards | Monthly fee + commission |
| **Managed** | We operate the hotel for the owner | Revenue share (20-30%) |
| **Leased** | We lease the property, run it ourselves | Full revenue, pay rent |
| **Revenue Share** | Light partnership, shared upside | Commission only (lower %) |

### 3B — Dynamic Pricing & Revenue Management

**What to build:**
- `DemandForecast` model — search volume, booking pace, seasonal indexes
- `LocalEvent` model — festivals, events that impact demand
- Price recommendation engine (rule-based first, ML later)
- Partner dashboard: suggested prices with reasoning

### 3C — Channel Manager

**What to build:**
- `ChannelConnection` model — sync with Booking.com, Agoda, TripAdvisor
- Two-way sync: availability + pricing → channels; bookings → platform
- Prevent overbooking across channels
- OTA commission tracking

### 3D — Enhanced Analytics

**What to build:**
- Partner analytics dashboard: occupancy trends, revenue, guest demographics
- Admin analytics: platform-wide KPIs, city-level performance
- Automated reports (weekly/monthly email digests)

---

## National Scale Phase
**Timeline**: 12-24 months after Phase 3
**Goal**: Expand beyond Surkhet to all major Nepal cities

### Infrastructure

| Component | Approach |
|-----------|----------|
| **Multi-city rollout** | `CityLaunch` model tracks each city's launch status |
| **Regional operations** | `RegionalOffice` model, `REGIONAL_MANAGER` role |
| **Partner onboarding** | `PartnerOnboardingChecklist` — standardized 10-step process |
| **Daily metrics** | `DailyMetrics` model for platform-wide and per-hotel analytics |
| **Loyalty program** | `LoyaltyProgram` + `LoyaltyTransaction` — points-based rewards |

### City Expansion Playbook

```
1. SCOUTING    — Market research, competitor analysis, hotel count
2. PLANNING    — Set targets, hire local BD team, identify top 20 hotels
3. ONBOARDING  — Sign partners, photoshoots, listing creation, training
4. SOFT LAUNCH — Limited bookings, quality checks, gather feedback
5. LIVE        — Full booking capability, marketing push
6. SCALING     — Add more hotels, optimize pricing, franchise deals
```

### Target Cities (Priority Order)

| Priority | City | Province | Rationale |
|----------|------|----------|-----------|
| 1 | Surkhet / Birendranagar | Karnali | Home market ✅ |
| 2 | Nepalgunj | Lumbini | Gateway to western Nepal, airport |
| 3 | Pokhara | Gandaki | Tourism capital, high volume |
| 4 | Kathmandu | Bagmati | Largest market, intense competition |
| 5 | Chitwan | Bagmati | Safari tourism, seasonal peaks |
| 6 | Lumbini | Lumbini | Religious tourism, growing market |
| 7 | Janakpur | Madhesh | Religious tourism, underserved |
| 8 | Dharan / Biratnagar | Koshi | Eastern hub, business travel |

### Organizational Structure at Scale

```
National HQ (Kathmandu)
├── CEO / Founder
├── CTO — Platform & Engineering
├── CFO — Finance & Commissions
├── VP Operations — Quality & Standards
├── VP Growth — Marketing & City Launches
│
├── Regional Office: Karnali (Surkhet)
│   ├── Regional Manager
│   ├── BD Team (2-3)
│   └── Quality Auditor (1)
│
├── Regional Office: Gandaki (Pokhara)
│   ├── Regional Manager
│   ├── BD Team (3-5)
│   └── Quality Auditors (2)
│
└── Regional Office: Bagmati (Kathmandu)
    ├── Regional Manager
    ├── BD Team (5-8)
    └── Quality Auditors (3)
```

---

## Schema Upgrade Path

See `SCHEMA-UPGRADE-PATH.md` for the exact migration steps between phases.

## Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Active schema (Phase 1) |
| `prisma/schema.future.prisma` | Future models (reference, not applied) |
| `src/lib/types/booking.ts` | Phase 2 TypeScript interfaces (type-only) |
| `src/lib/types/platform.ts` | Phase 3 + National interfaces (type-only) |
| `src/services/phase2/` | Phase 2 service interfaces |
| `docs/architecture/` | Architecture decision records |

---

## Success Metrics Per Phase

| Phase | Key Metric | Target |
|-------|-----------|--------|
| **Phase 1** | Monthly inquiries | 100+ |
| **Phase 1** | Partner applications | 10+ hotels listed |
| **Phase 2** | Online bookings | 50+ per month |
| **Phase 2** | Booking conversion rate | >5% of inquiries |
| **Phase 2** | Partner quality score avg | >70/100 |
| **Phase 3** | Monthly revenue (commission) | NPR 500K+ |
| **Phase 3** | Franchise agreements | 5+ properties |
| **National** | Cities live | 5+ cities |
| **National** | Total partner hotels | 200+ |
| **National** | Monthly bookings | 2000+ |
