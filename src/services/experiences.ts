// =============================================================================
// Experience Content Service
// Phase 1: Passthrough from static data
// Phase 2: Swap internals to Prisma queries (same API)
// =============================================================================

import { demoExperiences } from "@/data/surkhet";

// Re-export raw array for backward compat
export { demoExperiences } from "@/data/surkhet";

export type { ExperienceContent } from "@/lib/types/content";

export function getExperiences() {
  return demoExperiences;
}

export function getExperienceBySlug(slug: string) {
  return demoExperiences.find((e) => e.slug === slug);
}

export function getFeaturedExperiences() {
  return demoExperiences.filter((e) => e.isFeatured);
}

export function getExperiencesByCategory(category: string) {
  return demoExperiences.filter((e) => e.category === category);
}

export function getExperienceSlugs(): string[] {
  return demoExperiences.map((e) => e.slug);
}
