/**
 * Tourism Planning — Extensibility Types
 * ────────────────────────────────────────
 * Data shapes for features beyond Phase 1 static data:
 * dynamic itineraries, package pricing, destination bundles,
 * province-wide travel plans, and multi-city support.
 *
 * TYPE-ONLY — no runtime code generated.
 */

// ── Geography (multi-city/province) ──

export interface TourismRegion {
  id: string;
  name: string;
  slug: string;
  province: string;
  country: string;
  description: string;
  coverImage?: string;
  coordinates: { lat: number; lng: number };
  isActive: boolean;
}

export interface TourismCity {
  id: string;
  regionId: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage?: string;
  coordinates: { lat: number; lng: number };
  avgDailyCost: { budget: number; standard: number; premium: number };
  bestSeasons: string[];
  isActive: boolean;
}

// ── Dynamic Itineraries ──

export interface DynamicItinerary {
  id: string;
  cityId: string;
  title: string;
  slug: string;
  description: string;
  totalDays: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  tags: string[];
  days: DynamicItineraryDay[];
  basePrice: number; // NPR per person, base tier
  seasonalMultipliers: Record<string, number>; // e.g. { "Oct-Mar": 1.0, "Apr-Jun": 0.9 }
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DynamicItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  destinationIds: string[]; // link to destinations
  activitySlots: ActivitySlot[];
  meals: MealPlan;
  accommodationType: string;
  transportMode: string;
}

export interface ActivitySlot {
  timeOfDay: "morning" | "afternoon" | "evening";
  activityId?: string; // linked activity
  title: string;
  duration: string;
  isOptional: boolean;
  extraCost?: number;
}

export interface MealPlan {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  notes?: string;
}

// ── Package Pricing ──

export interface PackagePricing {
  packageId: string;
  tier: "budget" | "standard" | "premium";
  basePrice: number; // NPR per person
  groupDiscounts: GroupDiscount[];
  seasonalAdjustments: SeasonalAdjustment[];
  addOns: PackageAddOn[];
  validFrom: string;
  validTo: string;
}

export interface GroupDiscount {
  minPeople: number;
  maxPeople: number;
  discountPercent: number;
}

export interface SeasonalAdjustment {
  label: string; // "Peak Season", "Off Season"
  months: number[]; // 1-12
  multiplier: number; // e.g. 1.2 for peak, 0.85 for off
}

export interface PackageAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // "per person", "per group", "per day"
  category: "transport" | "activity" | "accommodation" | "food" | "other";
}

// ── Destination Bundles ──

export interface DestinationBundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  cityIds: string[]; // multi-city
  totalDays: number;
  tier: "budget" | "standard" | "premium";
  price: { min: number; max: number };
  highlights: string[];
  routeMap?: string; // SVG or image URL
  isPublished: boolean;
}

export interface BundleStop {
  bundleId: string;
  cityId: string;
  order: number;
  stayDays: number;
  transportToNext?: {
    mode: string;
    duration: string;
    cost: number;
  };
}

// ── Province-wide Travel Plans ──

export interface ProvincePlan {
  id: string;
  province: string;
  title: string;
  slug: string;
  description: string;
  totalDays: number;
  cities: ProvincePlanCity[];
  estimatedCost: { min: number; max: number };
  bestSeason: string;
  difficulty: string;
  coverImage?: string;
}

export interface ProvincePlanCity {
  cityId: string;
  cityName: string;
  order: number;
  stayDays: number;
  highlights: string[];
  transport: {
    fromPrevious?: string;
    mode: string;
    duration: string;
    cost: number;
  };
}

// ── Trip Builder (user-facing) ──

export interface TripBuilderState {
  selectedCityIds: string[];
  startDate?: string;
  endDate?: string;
  totalDays: number;
  tier: "budget" | "standard" | "premium";
  travelers: number;
  selectedActivities: string[];
  selectedAccommodations: string[];
  addOns: string[];
  estimatedTotal: number;
}

export interface TripBuilderResult {
  itinerary: DynamicItineraryDay[];
  pricing: {
    subtotal: number;
    groupDiscount: number;
    seasonalAdjustment: number;
    addOns: number;
    total: number;
    perPerson: number;
  };
  accommodations: Array<{ day: number; name: string; price: number }>;
  transport: Array<{ segment: string; mode: string; cost: number }>;
}
