// =============================================================================
// Availability Service — Phase 2B
// Check room availability, manage calendar, block/unblock dates
// =============================================================================

import type {
  AvailabilityQuery,
  AvailabilityResult,
  RoomAvailability,
} from "@/lib/types/booking";

// ── Read Operations ──

/** Check if rooms are available for a given date range */
export async function checkAvailability(
  _query: AvailabilityQuery
): Promise<AvailabilityResult> {
  // Phase 2B: Query RoomAvailability table, apply PricingRules, return results
  throw new Error("Not implemented — Phase 2B");
}

/** Get availability calendar for a room type (30/60/90 day view) */
export async function getRoomCalendar(
  _roomTypeId: string,
  _startDate: Date,
  _endDate: Date
): Promise<RoomAvailability[]> {
  throw new Error("Not implemented — Phase 2B");
}

// ── Write Operations (Partner Dashboard) ──

/** Block specific dates for a room type */
export async function blockDates(
  _roomTypeId: string,
  _dates: Date[],
  _reason?: string
): Promise<void> {
  throw new Error("Not implemented — Phase 2B");
}

/** Unblock previously blocked dates */
export async function unblockDates(
  _roomTypeId: string,
  _dates: Date[]
): Promise<void> {
  throw new Error("Not implemented — Phase 2B");
}

/** Set price override for specific dates */
export async function setPriceOverride(
  _roomTypeId: string,
  _dates: Date[],
  _price: number
): Promise<void> {
  throw new Error("Not implemented — Phase 2B");
}

/** Generate availability records for N days into the future */
export async function generateAvailability(
  _roomTypeId: string,
  _daysAhead: number
): Promise<number> {
  // Returns count of records created
  throw new Error("Not implemented — Phase 2B");
}

// ── Internal (called by booking engine) ──

/** Decrement available rooms for a date range (on booking confirm) */
export async function reserveInventory(
  _roomTypeId: string,
  _checkIn: Date,
  _checkOut: Date,
  _rooms: number
): Promise<boolean> {
  // Uses optimistic locking to prevent overbooking
  throw new Error("Not implemented — Phase 2B");
}

/** Release inventory (on booking cancel) */
export async function releaseInventory(
  _roomTypeId: string,
  _checkIn: Date,
  _checkOut: Date,
  _rooms: number
): Promise<void> {
  throw new Error("Not implemented — Phase 2B");
}
