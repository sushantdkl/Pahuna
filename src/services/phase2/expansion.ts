// =============================================================================
// City Launch Service — National Scale
// Multi-city expansion tracking, regional operations
// =============================================================================

import type {
  CityLaunch,
  CityLaunchStatus,
  RegionalOffice,
  DailyMetrics,
  PlatformKPIs,
} from "@/lib/types/platform";

// ── City Launch Management ──

/** Create a city launch record (start scouting a new city) */
export async function createCityLaunch(
  _cityId: string,
  _data: {
    estimatedHotels?: number;
    targetPartnerHotels?: number;
    avgDailyRate?: number;
    targetLaunchDate?: Date;
  }
): Promise<CityLaunch> {
  throw new Error("Not implemented — National Scale");
}

/** Update city launch status */
export async function updateLaunchStatus(
  _cityId: string,
  _status: CityLaunchStatus
): Promise<CityLaunch> {
  throw new Error("Not implemented — National Scale");
}

/** Get all city launches (admin dashboard) */
export async function getCityLaunches(): Promise<CityLaunch[]> {
  throw new Error("Not implemented — National Scale");
}

/** Get city launch details */
export async function getCityLaunch(
  _cityId: string
): Promise<CityLaunch | null> {
  throw new Error("Not implemented — National Scale");
}

// ── Regional Operations ──

/** Create a regional office */
export async function createRegionalOffice(
  _regionId: string,
  _data: {
    name: string;
    managerId?: string;
    address?: string;
    targetHotels?: number;
    targetRevenue?: number;
  }
): Promise<RegionalOffice> {
  throw new Error("Not implemented — National Scale");
}

/** Get all regional offices */
export async function getRegionalOffices(): Promise<RegionalOffice[]> {
  throw new Error("Not implemented — National Scale");
}

// ── Partner Onboarding ──

/**
 * Standardized 10-step onboarding process:
 *
 *  1. Agreement signed
 *  2. Photoshoot completed
 *  3. Listing created on platform
 *  4. Rooms configured with pricing
 *  5. Pricing rules set
 *  6. Bank details verified
 *  7. Staff training completed
 *  8. Quality audit passed
 *  9. Test booking completed
 * 10. Go-live approved
 */
export async function getOnboardingProgress(
  _hotelId: string
): Promise<{
  steps: Array<{
    key: string;
    label: string;
    completed: boolean;
    completedAt?: string;
  }>;
  completionPct: number;
  status: string;
}> {
  throw new Error("Not implemented — National Scale");
}

/** Mark an onboarding step as completed */
export async function completeOnboardingStep(
  _hotelId: string,
  _stepKey: string
): Promise<void> {
  throw new Error("Not implemented — National Scale");
}

// ── Analytics & Metrics ──

/** Record daily metrics (called by scheduled job) */
export async function recordDailyMetrics(
  _metrics: DailyMetrics
): Promise<void> {
  throw new Error("Not implemented — National Scale");
}

/** Get platform-wide KPIs */
export async function getPlatformKPIs(
  _period: string // "YYYY-MM"
): Promise<PlatformKPIs> {
  throw new Error("Not implemented — National Scale");
}

/** Get metrics for a specific hotel */
export async function getHotelMetrics(
  _hotelId: string,
  _startDate: Date,
  _endDate: Date
): Promise<DailyMetrics[]> {
  throw new Error("Not implemented — National Scale");
}

/** Get metrics for a city */
export async function getCityMetrics(
  _cityId: string,
  _startDate: Date,
  _endDate: Date
): Promise<DailyMetrics[]> {
  throw new Error("Not implemented — National Scale");
}

/** Get regional performance summary */
export async function getRegionalPerformance(
  _regionId: string,
  _period: string
): Promise<{
  region: string;
  citiesLive: number;
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  avgOccupancy: number;
  avgRating: number;
  topPerformingCity: string;
  growthRate: number; // vs previous period
}> {
  throw new Error("Not implemented — National Scale");
}
