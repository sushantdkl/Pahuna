// =============================================================================
// Payment Service — Phase 2E
// Payment initiation, verification, refunds across Nepal gateways
// =============================================================================

import type {
  PaymentIntent,
  PaymentMethod,
  PaymentVerification,
  ApiResponse,
} from "@/lib/types/booking";

// ── Payment Flow ──

/** Initiate a payment for a booking */
export async function initiatePayment(
  _bookingId: string,
  _method: PaymentMethod,
  _amount: number
): Promise<ApiResponse<{
  paymentId: string;
  redirectUrl?: string;  // For eSewa/Khalti redirect flow
  paymentToken?: string; // For in-app SDK flow
}>> {
  // 1. Create Payment record (status: PENDING)
  // 2. Call gateway SDK to create payment intent
  // 3. Return redirect URL or token
  throw new Error("Not implemented — Phase 2E");
}

/** Verify payment after gateway callback */
export async function verifyPayment(
  _verification: PaymentVerification
): Promise<ApiResponse<PaymentIntent>> {
  // 1. Call gateway verify API
  // 2. Check amount matches booking
  // 3. Update Payment record (status: COMPLETED or FAILED)
  // 4. If COMPLETED: update Booking status → PAID, calculate commission
  throw new Error("Not implemented — Phase 2E");
}

/** Process a refund */
export async function processRefund(
  _paymentId: string,
  _amount: number,
  _reason: string
): Promise<ApiResponse<PaymentIntent>> {
  // 1. Call gateway refund API
  // 2. Update Payment record
  // 3. Update Booking status
  // 4. Adjust commission
  throw new Error("Not implemented — Phase 2E");
}

/** Get payment details */
export async function getPayment(
  _paymentId: string
): Promise<PaymentIntent | null> {
  throw new Error("Not implemented — Phase 2E");
}

/** List payments for a booking */
export async function getBookingPayments(
  _bookingId: string
): Promise<PaymentIntent[]> {
  throw new Error("Not implemented — Phase 2E");
}

// ── Webhook Handlers ──

/** Handle eSewa payment webhook/callback */
export async function handleEsewaCallback(
  _params: Record<string, string>
): Promise<{ success: boolean; bookingId: string }> {
  throw new Error("Not implemented — Phase 2E");
}

/** Handle Khalti payment webhook/callback */
export async function handleKhaltiCallback(
  _params: Record<string, string>
): Promise<{ success: boolean; bookingId: string }> {
  throw new Error("Not implemented — Phase 2E");
}

// ── Reconciliation ──

/** Daily reconciliation check */
export async function reconcilePayments(
  _date: Date
): Promise<{
  matched: number;
  mismatched: number;
  missing: number;
  details: Array<{
    paymentId: string;
    issue: string;
  }>;
}> {
  throw new Error("Not implemented — Phase 2E");
}
