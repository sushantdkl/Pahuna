// =============================================================================
// Role definitions & permission helpers
// =============================================================================

import type { UserRole } from "@prisma/client";

/** Human-readable labels per role */
export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Administrator",
  EDITOR: "Content Manager",
  HOTEL_PARTNER: "Hotel Partner",
  TRAINING_MANAGER: "Training Manager",
  CONSULTING_MANAGER: "Consulting Manager",
};

/** Dashboard home path per role */
export const ROLE_HOME: Record<UserRole, string> = {
  ADMIN: "/dashboard",
  EDITOR: "/dashboard/content",
  HOTEL_PARTNER: "/dashboard/hotels",
  TRAINING_MANAGER: "/dashboard/training",
  CONSULTING_MANAGER: "/dashboard/consulting",
};

/**
 * Which dashboard sections each role can access.
 * "overview" is dashboard root, always shown to the role's home.
 */
export const ROLE_PERMISSIONS: Record<UserRole, readonly string[]> = {
  ADMIN: [
    "overview",
    "hotels",
    "content",
    "training",
    "consulting",
    "leads",
    "partners",
    "users",
    "settings",
  ],
  EDITOR: ["overview", "content", "hotels"],
  HOTEL_PARTNER: ["overview", "hotels", "leads"],
  TRAINING_MANAGER: ["overview", "training"],
  CONSULTING_MANAGER: ["overview", "consulting", "leads"],
};

/** Check if a role has access to a dashboard section */
export function hasPermission(role: UserRole, section: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(section) ?? false;
}

/** Check if a role is one of the allowed roles */
export function isRoleAllowed(
  role: UserRole,
  allowed: UserRole[],
): boolean {
  return allowed.includes(role);
}

// =============================================================================
// Future Role Expansion Notes
// =============================================================================
//
// Phase 2 adds: FINANCE
//   - Access: overview, commissions, payouts, reports
//   - Manages commission rules and monthly hotel payouts
//
// Phase 3 adds: FRANCHISE_MANAGER
//   - Access: overview, hotels, franchise agreements, brand standards
//   - Manages franchise onboarding and compliance
//
// National Scale adds: REGIONAL_MANAGER
//   - Access: overview, hotels (filtered to region), partners, analytics
//   - Manages city launches and regional operations
//
// To add a new role:
//   1. Add to UserRole enum in schema.prisma
//   2. Run prisma migrate dev
//   3. Add to ROLE_LABELS, ROLE_HOME, ROLE_PERMISSIONS in this file
//   4. Add dashboard pages for role-specific views
//   5. Update seed.ts with test user for new role
// =============================================================================
