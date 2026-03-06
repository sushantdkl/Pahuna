# Booking Engine Architecture
## Phase 2D — Technical Design Notes

> This document describes the booking engine architecture to be built in Phase 2.
> No runtime code is generated from this file.

---

## Booking Flow

```
┌─────────────┐    ┌──────────────┐    ┌────────────────┐    ┌─────────────┐
│   SEARCH    │───▶│  SELECT ROOM │───▶│ GUEST DETAILS  │───▶│   PAYMENT   │
│             │    │              │    │                │    │             │
│ City/Dates/ │    │ Available    │    │ Name/Email/    │    │ eSewa/      │
│ Guests      │    │ room types   │    │ Phone/ID       │    │ Khalti/     │
│             │    │ with prices  │    │ Special reqs   │    │ Cash        │
└─────────────┘    └──────────────┘    └────────────────┘    └──────┬──────┘
                                                                    │
                   ┌──────────────┐    ┌────────────────┐           │
                   │  COMPLETED   │◀───│ CONFIRMATION   │◀──────────┘
                   │              │    │                │
                   │ Post-stay    │    │ Booking ref    │
                   │ review       │    │ Email confirm  │
                   └──────────────┘    └────────────────┘
```

## Price Calculation Pipeline

```typescript
// Pseudocode — not runtime code

function calculatePrice(roomTypeId: string, checkIn: Date, checkOut: Date): number {
  const roomType = getRoomType(roomTypeId);
  const nights = differenceInDays(checkOut, checkIn);
  let totalPrice = 0;

  for (const date of eachDayOfInterval({ start: checkIn, end: subDays(checkOut, 1) })) {
    let nightPrice = roomType.price; // Base price

    // 1. Check for date-specific override (RoomAvailability.priceOverride)
    const availability = getAvailability(roomTypeId, date);
    if (availability?.priceOverride) {
      nightPrice = availability.priceOverride;
    }

    // 2. Apply pricing rules (stacked by priority)
    const rules = getActivePricingRules(roomType.hotelId, roomTypeId, date);
    for (const rule of rules.sortBy("priority")) {
      nightPrice = applyRule(nightPrice, rule);
    }

    // 3. Apply demand-based adjustment (Phase 3)
    // const forecast = getDemandForecast(cityId, date);
    // nightPrice *= forecast.recommendedMultiplier;

    totalPrice += nightPrice;
  }

  return totalPrice;
}
```

## Availability Check Logic

```typescript
// Pseudocode

function checkAvailability(query: AvailabilityQuery): AvailabilityResult {
  const { hotelId, checkIn, checkOut, guests, rooms } = query;
  const roomTypes = getRoomTypes(hotelId);
  const results = [];

  for (const rt of roomTypes) {
    if (rt.maxGuests < guests / rooms) continue; // Can't fit guests

    // Check every night in the range
    const dates = eachDayOfInterval({ start: checkIn, end: subDays(checkOut, 1) });
    let minAvailable = Infinity;

    for (const date of dates) {
      const avail = getAvailability(rt.id, date);
      if (!avail || !avail.isOpen) { minAvailable = 0; break; }

      const available = avail.totalRooms - avail.bookedRooms - avail.blockedRooms;
      minAvailable = Math.min(minAvailable, available);
    }

    if (minAvailable >= rooms) {
      results.push({
        roomType: rt,
        availableRooms: minAvailable,
        pricePerNight: calculatePrice(rt.id, checkIn, checkOut) / dates.length,
        totalPrice: calculatePrice(rt.id, checkIn, checkOut) * rooms,
        nights: dates.length,
      });
    }
  }

  return { available: results.length > 0, roomTypes: results };
}
```

## Booking Status State Machine

```
PENDING ──────────▶ CONFIRMED ──────────▶ PAYMENT_PENDING
   │                    │                       │
   │                    │                       ▼
   │                    │                     PAID
   │                    │                       │
   ▼                    ▼                       ├──▶ CHECKED_IN ──▶ COMPLETED
CANCELLED          CANCELLED                    │
                                                ├──▶ NO_SHOW
                                                │
                                                └──▶ REFUNDED
```

### Status Transitions & Side Effects

| From | To | Trigger | Side Effects |
|------|----|---------|-------------|
| PENDING | CONFIRMED | Partner confirms | Email to guest, hold inventory |
| PENDING | CANCELLED | Guest/partner cancels | Release inventory |
| CONFIRMED | PAYMENT_PENDING | System auto | Payment link sent to guest |
| PAYMENT_PENDING | PAID | Payment verified | Email confirmation, update commission |
| PAID | CHECKED_IN | Partner marks | Update occupancy metrics |
| CHECKED_IN | COMPLETED | Auto at checkout date | Send review request email |
| PAID | NO_SHOW | Partner marks | Partial refund per policy |
| PAID | REFUNDED | Admin processes | Refund via gateway, update commission |
| CONFIRMED | CANCELLED | Guest cancels | Cancellation fee per policy, release inventory |

## API Design

```
POST   /api/bookings                    Create booking
GET    /api/bookings/:id                Get booking details
PATCH  /api/bookings/:id/status         Update booking status
GET    /api/bookings?hotelId=&status=   List bookings (partner/admin)
GET    /api/availability                Check availability
POST   /api/payments/initiate           Start payment flow
POST   /api/payments/verify             Verify payment callback
POST   /api/webhooks/esewa              eSewa payment webhook
POST   /api/webhooks/khalti             Khalti payment webhook
```

## Concurrency & Overbooking Prevention

```
1. Optimistic locking on RoomAvailability
   - Read availability → show to user
   - At booking time: UPDATE room_availability SET booked_rooms = booked_rooms + 1
     WHERE id = ? AND (total_rooms - booked_rooms - blocked_rooms) >= 1
   - If affected rows = 0 → room no longer available, show error

2. Inventory hold (optional Phase 3)
   - When user starts booking flow, hold room for 15 minutes
   - Release if payment not completed
   - Prevents two users booking the last room simultaneously
```

## Commission Calculation

```typescript
// Triggered after booking status → PAID

function calculateCommission(booking: Booking): Commission {
  // 1. Get hotel-specific rule, or fall back to default
  const rule = getCommissionRule(booking.hotelId) ?? getDefaultRule();

  let amount: number;
  switch (rule.rateType) {
    case "PERCENTAGE":
      amount = Math.round(booking.subtotal * rule.rate / 100);
      break;
    case "FLAT_PER_BOOKING":
      amount = rule.rate;
      break;
    case "FLAT_PER_NIGHT":
      amount = rule.rate * booking.nights;
      break;
  }

  return {
    bookingId: booking.id,
    hotelId: booking.hotelId,
    bookingAmount: booking.subtotal,
    commissionRate: rule.rate,
    commissionAmount: amount,
    status: "PENDING",
  };
}
```

## Technology Choices

| Component | Recommendation | Reason |
|-----------|---------------|--------|
| Payment gateway | eSewa + Khalti | Most popular in Nepal |
| Email | Resend or Nodemailer + SMTP | Already have email.ts scaffold |
| PDF invoices | @react-pdf/renderer | Generate booking confirmations |
| Calendar UI | react-day-picker | Already compatible with shadcn/ui |
| Real-time updates | Server-Sent Events | Simpler than WebSocket for booking status |
