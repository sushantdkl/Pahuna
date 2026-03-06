// =============================================================================
// Commission Service — Phase 2F
// Commission calculation, tracking, and payout management
// =============================================================================

import type {
  Commission,
  CommissionSummary,
  ApiResponse,
} from "@/lib/types/booking";

// ── Calculation ──

/** Calculate commission for a confirmed booking */
export async function calculateCommission(
  _bookingId: string
): Promise<Commission> {
  // 1. Get booking details (amount, hotel)
  // 2. Get CommissionRule for hotel (or default)
  // 3. Calculate: PERCENTAGE, FLAT_PER_BOOKING, or FLAT_PER_NIGHT
  // 4. Create Commission record (status: PENDING)
  throw new Error("Not implemented — Phase 2F");
}

/** Recalculate commission (after booking modification or partial refund) */
export async function recalculateCommission(
  _bookingId: string
): Promise<Commission> {
  throw new Error("Not implemented — Phase 2F");
}

// ── Queries ──

/** Get commission summary for a hotel for a given period */
export async function getHotelCommissionSummary(
  _hotelId: string,
  _period: string // "YYYY-MM"
): Promise<CommissionSummary> {
  throw new Error("Not implemented — Phase 2F");
}

/** List all commissions for admin dashboard */
export async function getAllCommissions(
  _filters?: {
    hotelId?: string;
    status?: string;
    period?: string;
    page?: number;
    perPage?: number;
  }
): Promise<ApiResponse<Commission[]>> {
  throw new Error("Not implemented — Phase 2F");
}

// ── Payout Management ──

/** Generate monthly payout report for a hotel */
export async function generatePayout(
  _hotelId: string,
  _period: string
): Promise<{
  payoutId: string;
  totalBookings: number;
  totalRevenue: number;
  totalCommission: number;
  netPayout: number;
}> {
  throw new Error("Not implemented — Phase 2F");
}

/** Approve a payout for transfer */
export async function approvePayout(
  _payoutId: string,
  _approvedBy: string
): Promise<void> {
  throw new Error("Not implemented — Phase 2F");
}

/** Mark payout as transferred */
export async function markPayoutTransferred(
  _payoutId: string,
  _transferRef: string
): Promise<void> {
  throw new Error("Not implemented — Phase 2F");
}

/** Waive commission for a booking (promo, partnership deal) */
export async function waiveCommission(
  _commissionId: string,
  _reason: string
): Promise<void> {
  throw new Error("Not implemented — Phase 2F");
}

// ── Commission Rules ──

/** Get commission rule for a hotel */
export async function getCommissionRule(
  _hotelId: string
): Promise<{ rate: number; rateType: string } | null> {
  throw new Error("Not implemented — Phase 2F");
}

/** Set custom commission rule for a hotel */
export async function setCommissionRule(
  _hotelId: string,
  _rule: {
    name: string;
    rateType: "PERCENTAGE" | "FLAT_PER_BOOKING" | "FLAT_PER_NIGHT";
    rate: number;
    effectiveFrom?: Date;
  }
): Promise<void> {
  throw new Error("Not implemented — Phase 2F");
}
