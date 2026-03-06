// =============================================================================
// Consulting Content Service
// Phase 1: Passthrough from static data (same shapes pages consume)
// Phase 2: Swap internals to Prisma queries (same API, pages untouched)
// =============================================================================

// Re-export everything pages and components need, through the service layer
export {
  consultingServices,
  caseStudies,
  consultingTestimonials,
  consultingStats,
  consultingProcess,
  getServiceBySlug,
  getFeaturedServices,
  getCaseStudiesForService,
  getTestimonialsForService,
} from "@/data/consulting";

export type {
  ConsultingService,
  ConsultingIconName,
  ConsultingServiceFeature,
  ConsultingServiceDeliverable,
  CaseStudy,
  ConsultingTestimonial,
} from "@/data/consulting";

// Content types for Phase 2 Prisma mapping
export type {
  ConsultingServiceContent,
  CaseStudyContent,
  ConsultingTestimonialContent,
} from "@/lib/types/content";

// Service-layer additions
import { consultingServices } from "@/data/consulting";

/** All service slugs (for generateStaticParams) */
export function getServiceSlugs(): string[] {
  return consultingServices.map((s) => s.slug);
}
