// =============================================================================
// Training Content Service
// Phase 1: Passthrough from static data (same shapes pages consume)
// Phase 2: Swap internals to Prisma queries (same API, pages untouched)
// =============================================================================

// Re-export everything the pages and components need, through the service layer
export {
  trainingCourses,
  trainingStats,
  enrollmentProcess,
  studentTestimonials,
  generalFAQs,
  getCourseBySlug,
  getFeaturedCourses,
  getRelatedCourses,
  getTestimonialsForCourse,
  getAllCourseCategories,
} from "@/data/training";

export type {
  TrainingCourse,
  TrainingIconName,
  CourseModule,
  CourseInstructor,
  CourseFAQ,
  CareerOutcome,
  StudentTestimonial,
} from "@/data/training";

// Content types for Phase 2 Prisma mapping
export type {
  TrainingCourseContent,
  StudentTestimonialContent,
} from "@/lib/types/content";

// Service-layer additions
import { trainingCourses } from "@/data/training";

/** All course slugs (for generateStaticParams) */
export function getCourseSlugs(): string[] {
  return trainingCourses.map((c) => c.slug);
}
