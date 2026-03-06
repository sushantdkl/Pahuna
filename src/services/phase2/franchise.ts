// =============================================================================
// Franchise Service — Phase 3A
// Franchise agreements, brand standards, compliance tracking
// =============================================================================

import type {
  FranchiseAgreement,
  BrandStandard,
  BrandTier,
  AgreementType,
} from "@/lib/types/platform";

// ── Franchise Agreements ──

/** Create a new franchise agreement */
export async function createAgreement(
  _hotelId: string,
  _agreement: {
    agreementType: AgreementType;
    brandTier: BrandTier;
    startDate: Date;
    endDate: Date;
    franchiseFee?: number;
    monthlyFee?: number;
    revenueSharePct?: number;
    minimumGuarantee?: number;
  }
): Promise<FranchiseAgreement> {
  throw new Error("Not implemented — Phase 3A");
}

/** Get franchise agreement for a hotel */
export async function getAgreement(
  _hotelId: string
): Promise<FranchiseAgreement | null> {
  throw new Error("Not implemented — Phase 3A");
}

/** List all agreements by status */
export async function listAgreements(
  _filters?: {
    status?: string;
    brandTier?: BrandTier;
    agreementType?: AgreementType;
  }
): Promise<FranchiseAgreement[]> {
  throw new Error("Not implemented — Phase 3A");
}

// ── Brand Standards ──

/** Get brand standards for a tier */
export async function getBrandStandards(
  _brandTier: BrandTier
): Promise<BrandStandard[]> {
  throw new Error("Not implemented — Phase 3A");
}

/** Check hotel compliance against brand standards */
export async function checkCompliance(
  _hotelId: string
): Promise<{
  overallCompliance: number; // 0-100%
  requiredMet: number;
  requiredTotal: number;
  recommendedMet: number;
  recommendedTotal: number;
  gaps: Array<{
    standard: BrandStandard;
    status: "MET" | "NOT_MET" | "PARTIAL";
    notes?: string;
  }>;
}> {
  throw new Error("Not implemented — Phase 3A");
}

// ── Brand Tier Assignment ──

/**
 * Brand tier criteria:
 *
 * SURKHET_STAYS (Budget)
 *   - Quality score: 40+
 *   - 10+ rooms
 *   - Basic amenities (WiFi, hot water)
 *
 * SURKHET_SELECT (Mid-range)
 *   - Quality score: 65+
 *   - 15+ rooms
 *   - Restaurant on-site
 *   - AC in all rooms
 *   - Staff training completed
 *
 * SURKHET_PREMIUM (Upscale)
 *   - Quality score: 85+
 *   - 25+ rooms
 *   - Full-service restaurant + bar
 *   - Conference facilities
 *   - Spa or wellness area
 *   - 24/7 front desk
 *   - PMS integrated
 */
export function suggestBrandTier(
  _qualityScore: number,
  _totalRooms: number,
  _amenities: string[]
): BrandTier {
  // Phase 3A: Implement tier suggestion logic
  return "SURKHET_STAYS";
}
