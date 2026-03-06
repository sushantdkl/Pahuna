# Schema Upgrade Path
## From Phase 1 → Phase 2 → Phase 3 → National Scale

> Each migration is additive. No existing tables are dropped or renamed.
> All new fields on existing models use `?` (optional) or `@default()` to avoid breaking changes.

---

## Phase 1 → Phase 2A: Partner Standardization

### New Models
```sql
-- Run: npx prisma migrate dev --name phase2a_partner_scoring
```

```prisma
// Add to schema.prisma:

model HotelPartner {
  id          String   @id @default(cuid())
  userId      String
  hotelId     String
  role        String   @default("OWNER")
  isActive    Boolean  @default(true)
  permissions String[]
  user        User     @relation(fields: [userId], references: [id])
  hotel       Hotel    @relation(fields: [hotelId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@unique([userId, hotelId])
}

model QualityScore { ... }  // See schema.future.prisma
model QualityAudit { ... }  // See schema.future.prisma
```

### Existing Model Changes
```prisma
// Hotel — add relation:
model Hotel {
  // ... existing fields unchanged ...
  partners    HotelPartner[]  // NEW
}

// User — add relation:
model User {
  // ... existing fields unchanged ...
  managedHotels HotelPartner[]  // NEW
}

// UserRole — add:
enum UserRole {
  // ... existing values unchanged ...
  FINANCE  // NEW
}
```

### Migration Safety
- All new fields are optional or have defaults
- No existing data affected
- `HotelPartner` is a new join table — existing User/Hotel records don't need it
- Existing HOTEL_PARTNER users continue to work; link them to hotels via data migration

### Data Migration Script
```typescript
// prisma/migrations/phase2a-data.ts
// Link existing HOTEL_PARTNER users to their hotels based on partner applications
async function linkPartnersToHotels() {
  const approvedApps = await db.partnerApplication.findMany({
    where: { status: "APPROVED" },
  });
  // Create HotelPartner records...
}
```

---

## Phase 2A → Phase 2B: Room Inventory & Availability

### Existing Model Changes
```prisma
// RoomType — enhance existing model:
model RoomType {
  // ... existing fields unchanged ...
  isActive      Boolean  @default(true)   // NEW
  sortOrder     Int      @default(0)      // NEW
  availability  RoomAvailability[]        // NEW relation
  bookingItems  BookingItem[]             // NEW relation (for Phase 2D)
}
```

### New Models
```prisma
model RoomAvailability {
  id            String   @id @default(cuid())
  roomTypeId    String
  date          DateTime @db.Date
  roomType      RoomType @relation(fields: [roomTypeId], references: [id], onDelete: Cascade)
  totalRooms    Int
  bookedRooms   Int      @default(0)
  blockedRooms  Int      @default(0)
  priceOverride Int?
  minimumStay   Int      @default(1)
  isOpen        Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  @@unique([roomTypeId, date])
  @@index([date])
}
```

### Migration Safety
- `RoomType` already exists with data in Phase 1
- New fields `isActive` and `sortOrder` have defaults, so existing rows are fine
- `RoomAvailability` is net-new — no data to migrate

### Seed Script
```typescript
// Generate 90 days of availability for each room type
async function seedAvailability() {
  const roomTypes = await db.roomType.findMany();
  for (const rt of roomTypes) {
    for (let d = 0; d < 90; d++) {
      const date = addDays(new Date(), d);
      await db.roomAvailability.create({
        data: {
          roomTypeId: rt.id,
          date,
          totalRooms: rt.quantity,
          isOpen: true,
        },
      });
    }
  }
}
```

---

## Phase 2B → Phase 2C: Pricing Rules

### New Models
```prisma
model PricingRule { ... }  // See schema.future.prisma
```

### Migration Safety
- Net-new model, no existing data affected
- Hotels with no PricingRule entries use `RoomType.price` as base

---

## Phase 2C → Phase 2D: Booking Engine

### New Models
```prisma
model Booking { ... }      // See schema.future.prisma
model BookingItem { ... }  // See schema.future.prisma
```

### Existing Model Changes
```prisma
// Hotel — add relation:
model Hotel {
  // ... existing fields ...
  bookings    Booking[]  // NEW
}

// Inquiry — add optional booking link:
model Inquiry {
  // ... existing fields ...
  bookingId   String?    // NEW — inquiry that converted to a booking
  booking     Booking?   @relation(fields: [bookingId], references: [id])
}
```

### Booking Reference Format
```
SH-{YEAR}-{6-DIGIT-SEQUENCE}
Example: SH-2026-000001
```

### Migration Safety
- `Inquiry.bookingId` is optional — existing inquiries unaffected
- Counter/sequence for booking references: use a DB sequence or application-level counter

---

## Phase 2D → Phase 2E: Payments

### New Models
```prisma
model Payment { ... }  // See schema.future.prisma
```

### Integration Points
- eSewa Merchant API: https://developer.esewa.com.np
- Khalti Payment Gateway: https://docs.khalti.com
- ConnectIPS: https://connectips.com/developer

### Environment Variables Needed
```env
# .env.local additions for Phase 2E
ESEWA_MERCHANT_ID=
ESEWA_SECRET_KEY=
ESEWA_API_URL=https://esewa.com.np/api/...

KHALTI_SECRET_KEY=
KHALTI_PUBLIC_KEY=
KHALTI_API_URL=https://khalti.com/api/v2/...
```

---

## Phase 2E → Phase 2F: Commission System

### New Models
```prisma
model CommissionRule { ... }    // See schema.future.prisma
model Commission { ... }       // See schema.future.prisma
model CommissionPayout { ... } // See schema.future.prisma
```

### Default Commission Rule
```typescript
// Seed: default 15% commission for all hotels
await db.commissionRule.create({
  data: {
    name: "Standard Commission",
    rateType: "PERCENTAGE",
    rate: 15,
    isDefault: true,
    isActive: true,
  },
});
```

---

## Phase 2F → Phase 2G: Guest Reviews

### New Models
```prisma
model GuestReview { ... }  // See schema.future.prisma
```

### Existing Model Changes
```prisma
// Hotel — add computed rating fields:
model Hotel {
  // ... existing fields ...
  reviewCount    Int    @default(0)  // NEW — denormalized for performance
  avgRating      Float? // NEW — updated on review create/update
  reviews        GuestReview[]      // NEW relation
}
```

---

## Phase 2 → Phase 3A: Franchise Model

### New Models
```prisma
model FranchiseAgreement { ... }  // See schema.future.prisma
model BrandStandard { ... }       // See schema.future.prisma
```

### Existing Model Changes
```prisma
// Hotel — add franchise fields:
model Hotel {
  // ... existing fields ...
  brandTier       String?  // NEW — "SURKHET_STAYS", "SURKHET_SELECT", "SURKHET_PREMIUM"
  isFranchise     Boolean  @default(false)  // NEW
  franchiseAgreement FranchiseAgreement?    // NEW relation
}

// UserRole — add:
enum UserRole {
  // ... existing values ...
  FRANCHISE_MANAGER  // NEW
}
```

---

## Phase 3 → National Scale

### New Models
```prisma
model RegionalOffice { ... }              // See schema.future.prisma
model CityLaunch { ... }                  // See schema.future.prisma
model PartnerOnboardingChecklist { ... }  // See schema.future.prisma
model DailyMetrics { ... }               // See schema.future.prisma
model LoyaltyProgram { ... }             // See schema.future.prisma
model LoyaltyTransaction { ... }         // See schema.future.prisma
```

### Existing Model Changes
```prisma
// Region — add office:
model Region {
  // ... existing fields ...
  office  RegionalOffice?  // NEW
}

// City — add launch tracking:
model City {
  // ... existing fields ...
  launch  CityLaunch?  // NEW
}

// UserRole — add:
enum UserRole {
  // ... existing values ...
  REGIONAL_MANAGER  // NEW
}
```

---

## Migration Checklist Template

For each migration:

- [ ] Copy relevant models from `schema.future.prisma` → `schema.prisma`
- [ ] Uncomment relations (remove `//` from relation lines)
- [ ] Run `npx prisma migrate dev --name phase_X_feature`
- [ ] Run `npx prisma generate`
- [ ] Create/update service layer (`src/services/`)
- [ ] Create/update TypeScript types (`src/lib/types/`)
- [ ] Update `ROLE_PERMISSIONS` in `src/lib/roles.ts` if new sections added
- [ ] Add dashboard pages for new sections
- [ ] Update seed script with sample data
- [ ] Write data migration script if existing records need linking
- [ ] Test with existing data — no breaking changes
- [ ] Update `EXPANSION-ROADMAP.md` status
