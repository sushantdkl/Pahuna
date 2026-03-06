// =============================================================================
// City Content Service
// Phase 1: reads from static data → Phase 2: swap to Prisma queries
// =============================================================================

import type { CityContent } from "@/lib/types/content";
import { surkhetCity } from "@/data/surkhet";

// Re-export raw data for backward compat
export { surkhetCity, demoTrainingCourses, tripCostCategories } from "@/data/surkhet";

const city: CityContent = {
  id: surkhetCity.slug,
  slug: surkhetCity.slug,
  name: surkhetCity.name,
  tagline: surkhetCity.tagline,
  description: surkhetCity.description,
  coverImage: surkhetCity.coverImage,
  latitude: surkhetCity.latitude,
  longitude: surkhetCity.longitude,
};

export function getCity(slug = "surkhet"): CityContent | undefined {
  if (slug === "surkhet") return city;
  return undefined;
}

export function getDefaultCity(): CityContent {
  return city;
}
