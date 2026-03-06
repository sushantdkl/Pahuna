// =============================================================================
// Destination Content Service
// Phase 1: Passthrough from static data
// Phase 2: Swap internals to Prisma queries (same API)
// =============================================================================

import { demoDestinations } from "@/data/surkhet";

// Re-export raw array for backward compat
export { demoDestinations } from "@/data/surkhet";

export type { DestinationContent } from "@/lib/types/content";

export function getDestinations() {
  return demoDestinations;
}

export function getDestinationBySlug(slug: string) {
  return demoDestinations.find((d) => d.slug === slug);
}

export function getFeaturedDestinations() {
  return demoDestinations.filter((d) => d.isFeatured);
}

export function getDestinationSlugs(): string[] {
  return demoDestinations.map((d) => d.slug);
}
