// =============================================================================
// Reviews Service — Phase 2G
// Guest reviews, moderation, hotel responses, rating aggregation
// =============================================================================

import type { GuestReview, ApiResponse } from "@/lib/types/booking";

// ── Guest-Facing ──

/** Submit a review (only for completed bookings) */
export async function submitReview(
  _bookingId: string,
  _review: {
    overallRating: number;
    cleanliness?: number;
    location?: number;
    valueForMoney?: number;
    service?: number;
    amenities?: number;
    title?: string;
    comment?: string;
  }
): Promise<ApiResponse<GuestReview>> {
  // 1. Verify booking exists and status is COMPLETED
  // 2. Verify no existing review for this booking
  // 3. Create GuestReview (isVerified: true, isPublished: false)
  // 4. Queue for moderation
  // 5. Update hotel's aggregate rating
  throw new Error("Not implemented — Phase 2G");
}

/** Get published reviews for a hotel (public) */
export async function getHotelReviews(
  _hotelId: string,
  _options?: {
    page?: number;
    perPage?: number;
    sortBy?: "newest" | "highest" | "lowest";
  }
): Promise<ApiResponse<GuestReview[]>> {
  throw new Error("Not implemented — Phase 2G");
}

/** Get aggregate ratings for a hotel */
export async function getHotelRatingSummary(
  _hotelId: string
): Promise<{
  averageRating: number;
  totalReviews: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>; // Count per star
  categories: {
    cleanliness: number;
    location: number;
    valueForMoney: number;
    service: number;
    amenities: number;
  };
}> {
  throw new Error("Not implemented — Phase 2G");
}

// ── Partner Dashboard ──

/** Respond to a review */
export async function respondToReview(
  _reviewId: string,
  _response: string
): Promise<void> {
  throw new Error("Not implemented — Phase 2G");
}

// ── Admin Moderation ──

/** Get reviews pending moderation */
export async function getPendingReviews(): Promise<GuestReview[]> {
  throw new Error("Not implemented — Phase 2G");
}

/** Approve a review for publication */
export async function approveReview(_reviewId: string): Promise<void> {
  // 1. Set isPublished = true
  // 2. Recalculate hotel aggregate rating
  // 3. Update QualityScore.guestSatisfaction
  throw new Error("Not implemented — Phase 2G");
}

/** Reject a review */
export async function rejectReview(
  _reviewId: string,
  _reason: string
): Promise<void> {
  throw new Error("Not implemented — Phase 2G");
}

/** Flag a review for investigation */
export async function flagReview(
  _reviewId: string,
  _reason: string
): Promise<void> {
  throw new Error("Not implemented — Phase 2G");
}
