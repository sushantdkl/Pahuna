// =============================================================================
// Tourism Content Service — Trip packages, transport, budgets, roadmap
// Phase 1: Passthrough from static data (same shapes pages consume)
// Phase 2: Swap internals to Prisma queries (same API, pages untouched)
// =============================================================================

// Re-export everything pages and components need, through the service layer
export {
  budgetTiers,
  costBreakdown,
  transportRoutes,
  tripPackages,
  tourismRoadmap,
  calculateDailyCost,
  calculateTripCost,
  getTierPackages,
  getFeaturedPackages,
} from "@/data/tourism";

export type {
  BudgetTier,
  BudgetTierConfig,
  CostLineItem,
  CostCategory,
  TransportRoute,
  PackageDay,
  TripPackage,
  RoadmapPhase,
} from "@/data/tourism";

// Content types for Phase 2 Prisma mapping
export type {
  BudgetTierContent,
  CostCategoryContent,
  TransportRouteContent,
  TripPackageContent,
  RoadmapPhaseContent,
} from "@/lib/types/content";

// Service-layer additions
import { tripPackages } from "@/data/tourism";

/** Find package by slug */
export function getPackageBySlug(slug: string) {
  return tripPackages.find((p) => p.slug === slug);
}

/** All package slugs (for generateStaticParams) */
export function getPackageSlugs(): string[] {
  return tripPackages.map((p) => p.slug);
}
