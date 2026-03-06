/**
 * Phase 3 + National Scale Platform Types
 * ────────────────────────────────────────
 * TYPE-ONLY definitions. No runtime code.
 * Extends the Phase 2 booking types in booking.ts.
 */

// ── Partner Scoring & Quality ──

export interface QualityScoreDimensions {
  cleanliness: number;      // 0-100
  amenityAccuracy: number;  // 0-100
  photoAccuracy: number;    // 0-100
  safetyCompliance: number; // 0-100
  guestSatisfaction: number;// 0-100 (derived from reviews)
  responseTime: number;     // 0-100 (derived from inquiry response times)
}

export type PartnerTier = "BASIC" | "STANDARD" | "PREMIUM" | "ELITE";

export interface QualityScore extends QualityScoreDimensions {
  id: string;
  hotelId: string;
  overallScore: number;     // Weighted composite 0-100
  tier: PartnerTier;
  lastAuditDate?: string;
  nextAuditDue?: string;
}

export interface AuditFinding {
  category: string;
  finding: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  photoUrl?: string;
  recommendation?: string;
}

export interface QualityAudit {
  id: string;
  qualityScoreId: string;
  auditorId?: string;
  auditType: "INITIAL" | "ROUTINE" | "COMPLAINT" | "UPGRADE";
  findings: AuditFinding[];
  photos: string[];
  recommendations?: string;
  previousScore: number;
  newScore: number;
  previousTier: PartnerTier;
  newTier: PartnerTier;
  completedAt?: string;
  createdAt: string;
}

// ── Pricing Rules ──

export type PricingRuleType =
  | "SEASONAL"
  | "DAY_OF_WEEK"
  | "OCCUPANCY"
  | "EARLY_BIRD"
  | "LAST_MINUTE"
  | "PROMO";

export type AdjustmentType = "PERCENTAGE" | "FIXED_AMOUNT";

export interface PricingRule {
  id: string;
  hotelId: string;
  roomTypeId?: string;
  name: string;
  ruleType: PricingRuleType;
  priority: number;
  startDate?: string;
  endDate?: string;
  daysOfWeek: number[]; // 0=Sun .. 6=Sat
  minOccupancy?: number;
  minAdvanceDays?: number;
  maxAdvanceDays?: number;
  adjustmentType: AdjustmentType;
  adjustmentValue: number;
  minimumPrice?: number;
  maximumPrice?: number;
  isActive: boolean;
}

// ── Franchise Model ──

export type AgreementType = "FRANCHISE" | "MANAGED" | "LEASED" | "REVENUE_SHARE";
export type BrandTier = "SURKHET_STAYS" | "SURKHET_SELECT" | "SURKHET_PREMIUM";
export type TechnologyPackage = "BASIC" | "STANDARD" | "FULL";

export interface FranchiseAgreement {
  id: string;
  hotelId: string;
  agreementType: AgreementType;
  brandTier: BrandTier;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  franchiseFee?: number;
  monthlyFee?: number;
  revenueSharePct?: number;
  minimumGuarantee?: number;
  renovationRequired: boolean;
  renovationDeadline?: string;
  trainingRequired: boolean;
  technologyPackage?: TechnologyPackage;
  status: "DRAFT" | "NEGOTIATION" | "SIGNED" | "ACTIVE" | "EXPIRED" | "TERMINATED";
  signedAt?: string;
}

export interface BrandStandard {
  id: string;
  brandTier: BrandTier;
  category: "ROOM_QUALITY" | "AMENITIES" | "SERVICE" | "TECHNOLOGY" | "BRANDING";
  requirement: string;
  description?: string;
  isRequired: boolean;
  weight: number;
}

// ── Dynamic Pricing ──

export interface DemandForecast {
  id: string;
  cityId: string;
  date: string;
  searchVolume?: number;
  bookingPace?: number;
  competitorPrice?: number;
  eventImpact?: number;
  seasonalIndex?: number;
  recommendedMultiplier: number;
  confidence: number;
}

export interface LocalEvent {
  id: string;
  cityId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  expectedImpact: "LOW" | "MEDIUM" | "HIGH" | "EXTREME";
  priceMultiplier: number;
}

// ── Channel Management ──

export interface ChannelConnection {
  id: string;
  hotelId: string;
  channelName: string;
  channelHotelId?: string;
  syncAvailability: boolean;
  syncPricing: boolean;
  syncBookings: boolean;
  status: "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "ERROR";
  lastSyncAt?: string;
  lastError?: string;
}

// ── Multi-City Operations ──

export type CityLaunchStatus =
  | "SCOUTING"
  | "PLANNING"
  | "ONBOARDING"
  | "SOFT_LAUNCH"
  | "LIVE"
  | "SCALING";

export interface CityLaunch {
  id: string;
  cityId: string;
  status: CityLaunchStatus;
  targetLaunchDate?: string;
  actualLaunchDate?: string;
  estimatedHotels?: number;
  targetPartnerHotels?: number;
  currentPartners: number;
  avgDailyRate?: number;
  localManagerId?: string;
  bdTeamSize: number;
}

export interface RegionalOffice {
  id: string;
  name: string;
  regionId: string;
  managerId?: string;
  address?: string;
  phone?: string;
  email?: string;
  targetHotels?: number;
  targetRevenue?: number;
  targetBookings?: number;
  isActive: boolean;
}

export interface PartnerOnboardingStep {
  key: string;
  label: string;
  completed: boolean;
  completedAt?: string;
}

// ── Loyalty ──

export type LoyaltyTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

export interface LoyaltyMember {
  id: string;
  userId: string;
  tier: LoyaltyTier;
  totalPoints: number;
  availablePoints: number;
  totalBookings: number;
  totalSpend: number;
  memberSince: string;
}

export interface LoyaltyTransaction {
  id: string;
  loyaltyId: string;
  type: "EARN" | "REDEEM" | "EXPIRE" | "BONUS" | "ADJUSTMENT";
  points: number;
  description: string;
  bookingId?: string;
  createdAt: string;
}

// ── Analytics ──

export interface DailyMetrics {
  date: string;
  hotelId?: string;
  cityId?: string;
  pageViews: number;
  searches: number;
  inquiries: number;
  bookings: number;
  revenue: number;
  cancellations: number;
  avgRating?: number;
  occupancyRate?: number;
  conversionRate?: number;
  avgBookingValue?: number;
}

export interface PlatformKPIs {
  period: string;
  totalHotels: number;
  activeHotels: number;
  totalBookings: number;
  totalRevenue: number;
  totalCommission: number;
  avgOccupancyRate: number;
  avgRating: number;
  citiesLive: number;
  newPartnersThisMonth: number;
  customerRetentionRate: number;
}
