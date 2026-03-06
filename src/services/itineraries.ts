// =============================================================================
// Itinerary Content Service
// Phase 1: Passthrough from static data
// Phase 2: Swap internals to Prisma queries (same API)
// =============================================================================

import { demoItineraries } from "@/data/surkhet";

// Re-export raw array for backward compat
export { demoItineraries } from "@/data/surkhet";

export type { ItineraryContent, ItineraryDayContent } from "@/lib/types/content";

export function getItineraries() {
  return demoItineraries;
}

export function getItineraryBySlug(slug: string) {
  return demoItineraries.find((i) => i.slug === slug);
}

export function getFeaturedItineraries() {
  return demoItineraries.filter((i) => i.isFeatured);
}

export function getItinerarySlugs(): string[] {
  return demoItineraries.map((i) => i.slug);
}
