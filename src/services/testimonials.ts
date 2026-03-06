// =============================================================================
// Testimonial Content Service
// Phase 1: reads from static data → Phase 2: swap to Prisma queries
// =============================================================================

import type { TestimonialContent } from "@/lib/types/content";
import { demoTestimonials } from "@/data/surkhet";

// Re-export raw array for backward compat
export { demoTestimonials } from "@/data/surkhet";

const testimonials: TestimonialContent[] = demoTestimonials.map((t, idx) => ({
  id: `testimonial-${idx + 1}`,
  slug: `testimonial-${idx + 1}`,
  name: t.name,
  role: t.role,
  quote: t.quote,
  rating: t.rating,
  avatar: t.avatar,
  category: "General",
  isPublished: true,
}));

export function getTestimonials(
  category?: string
): TestimonialContent[] {
  if (category) {
    return testimonials.filter(
      (t) => t.category === category && t.isPublished
    );
  }
  return testimonials.filter((t) => t.isPublished);
}

export function getFeaturedTestimonials(
  limit = 4
): TestimonialContent[] {
  return testimonials.filter((t) => t.isPublished).slice(0, limit);
}
