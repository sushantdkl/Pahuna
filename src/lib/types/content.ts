// =============================================================================
// Centralized Content Types — Admin-Ready, CMS-Compatible
// All content models share a common base for consistency.
// These types represent the DISPLAY shape of data consumed by pages/components.
// The service layer maps Prisma models or static data to these types.
// =============================================================================

// ── Base Types ──

/** Every piece of content has these fields */
export interface ContentBase {
  id: string;
  slug: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/** SEO fields shared by all public-facing content */
export interface SEOFields {
  metaTitle?: string;
  metaDesc?: string;
}

/** Publishing state for admin panel */
export interface PublishableContent {
  isActive: boolean;
  isFeatured: boolean;
}

/** Image with alt text and ordering */
export interface ContentImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

// ── Geography ──

export interface CityContent extends ContentBase {
  name: string;
  tagline?: string;
  description?: string;
  coverImage?: string;
  latitude?: number;
  longitude?: number;
}

// ── Hotels ──

export interface HotelContent extends ContentBase, SEOFields, PublishableContent {
  name: string;
  description?: string;
  shortDesc?: string;
  propertyType: string;
  status: string;
  address?: string;
  cityId: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
  phone?: string;
  email?: string;
  website?: string;
  priceMin?: number;
  priceMax?: number;
  starRating?: number;
  isVerified: boolean;
  amenities: string[];
  images: ContentImage[];
  checkInTime?: string;
  checkOutTime?: string;
  cancellationPolicy?: string;
  sortOrder?: number;
}

// ── Destinations ──

export interface DestinationContent extends ContentBase, SEOFields, PublishableContent {
  name: string;
  description?: string;
  shortDesc?: string;
  coverImage?: string;
  images?: string[];
  cityId: string;
  latitude?: number;
  longitude?: number;
  bestSeason?: string;
  entryFee?: string;
}

// ── Experiences ──

export interface ExperienceContent extends ContentBase, SEOFields, PublishableContent {
  title: string;
  description?: string;
  shortDesc?: string;
  coverImage?: string;
  images?: string[];
  category: string;
  duration?: string;
  difficulty?: string;
  priceRange?: string;
  bestSeason?: string;
  cityId: string;
}

// ── Itineraries ──

export interface ItineraryDayContent {
  dayNumber: number;
  title: string;
  description?: string;
  activities: string[];
  meals?: string;
  overnight?: string;
}

export interface ItineraryContent extends ContentBase, SEOFields, PublishableContent {
  title: string;
  description?: string;
  shortDesc?: string;
  coverImage?: string;
  duration: string;
  totalDays: number;
  difficulty?: string;
  estimatedCost?: string;
  bestSeason?: string;
  groupSize?: string;
  cityId: string;
  days: ItineraryDayContent[];
}

// ── Blog ──

export interface BlogPostContent extends ContentBase, SEOFields {
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category?: string;
  tags: string[];
  authorName: string;
  authorImage?: string;
  isPublished: boolean;
  publishedAt?: string | Date;
  readTime?: number;
  viewCount?: number;
  cityId?: string;
}

// ── Training ──

export interface CourseModuleContent {
  title: string;
  topics: string[];
}

export interface CourseInstructorContent {
  name: string;
  title: string;
  bio: string;
  experience: string;
  specialties: string[];
  image?: string;
}

export interface CourseFAQContent {
  question: string;
  answer: string;
}

export interface CareerOutcomeContent {
  role: string;
  salary: string;
  description: string;
}

export interface TrainingCourseContent extends ContentBase, SEOFields {
  title: string;
  tagline?: string;
  description?: string;
  shortDesc?: string;
  coverImage?: string;
  icon?: string;
  color?: string;
  category: string;
  duration: string;
  fee?: number;
  maxStudents?: number;
  level?: string;
  mode?: string;
  prerequisites?: string;
  schedule?: string;
  location?: string;
  batchInfo?: string;
  certification?: string;
  status: string;
  isActive: boolean;
  isFeatured: boolean;
  isUpcoming: boolean;

  // Rich structured data (JSON in DB)
  modules: CourseModuleContent[];
  instructor: CourseInstructorContent;
  careerOutcomes: CareerOutcomeContent[];
  faqs: CourseFAQContent[];
}

export interface StudentTestimonialContent {
  id: string;
  name: string;
  role: string;
  courseSlug: string;
  courseName: string;
  quote: string;
  rating: number;
  avatar?: string;
  graduationYear?: string;
}

// ── Consulting ──

export interface ConsultingFeatureContent {
  title: string;
  description: string;
}

export interface ConsultingDeliverableContent {
  title: string;
  items: string[];
}

export interface ConsultingServiceContent extends ContentBase {
  title: string;
  tagline: string;
  shortDesc: string;
  description: string;
  icon: string;
  color: string;
  features: ConsultingFeatureContent[];
  deliverables: ConsultingDeliverableContent[];
  idealFor: string[];
  startingPrice: string;
  duration: string;
  isFeatured: boolean;
}

export interface CaseStudyContent extends ContentBase {
  clientName: string;
  businessType: string;
  location: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  servicesUsed: string[];
  duration: string;
}

export interface ConsultingTestimonialContent {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  service: string;
}

// ── Tourism / Trip Planning ──

export type BudgetTier = "budget" | "standard" | "premium";

export interface BudgetTierContent {
  id: BudgetTier;
  label: string;
  tagline: string;
  emoji: string;
  color: string;
  perDayMin: number;
  perDayMax: number;
  description: string;
  includes: string[];
}

export interface CostLineItemContent {
  name: string;
  unit: string;
  budget: { min: number; max: number };
  standard: { min: number; max: number };
  premium: { min: number; max: number };
}

export interface CostCategoryContent {
  category: string;
  emoji: string;
  items: CostLineItemContent[];
}

export interface TransportRouteContent {
  from: string;
  to: string;
  mode: string;
  durationHours: string;
  costMin: number;
  costMax: number;
  frequency: string;
  notes?: string;
}

export interface PackageDayContent {
  dayNumber: number;
  title: string;
  highlights: string[];
  meals: string;
  overnight: string;
}

export interface TripPackageContent extends ContentBase {
  title: string;
  tier: BudgetTier;
  duration: string;
  totalDays: number;
  totalNights: number;
  shortDesc: string;
  description: string;
  pricePerPerson: { min: number; max: number };
  groupSize: string;
  bestSeason: string;
  highlights: string[];
  costSplit: {
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    misc: number;
  };
  days: PackageDayContent[];
  isFeatured: boolean;
}

export interface RoadmapPhaseContent {
  phase: number;
  title: string;
  timeline: string;
  status: "completed" | "in-progress" | "upcoming" | "planned";
  description: string;
  deliverables: string[];
}

// ── FAQ ──

export interface FAQItemContent extends ContentBase {
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
  isPublished: boolean;
}

// ── Testimonials (general) ──

export interface TestimonialContent extends ContentBase {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar?: string;
  category?: string;
  isPublished: boolean;
}

// ── Stats (generic for any section) ──

export interface StatContent {
  label: string;
  value: string;
  suffix?: string;
}

// ── Process Steps (generic for consulting/training) ──

export interface ProcessStepContent {
  step: number;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
}

// ── Navigation ──

export interface NavItemContent {
  label: string;
  href: string;
  description?: string;
  children?: NavItemContent[];
}
