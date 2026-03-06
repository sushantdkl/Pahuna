// =============================================================================
// Hotel Content Service
// Phase 1: Passthrough from static data (same shapes pages consume)
// Phase 2: Swap internals to Prisma queries (same API, pages untouched)
// =============================================================================

import { demoHotels } from "@/data/surkhet";

// Re-export raw array for backward compat (pages can use directly)
export { demoHotels } from "@/data/surkhet";

export type { HotelContent } from "@/lib/types/content";

/** All hotels */
export function getHotels() {
  return demoHotels;
}

/** Single hotel by slug */
export function getHotelBySlug(slug: string) {
  return demoHotels.find((h) => h.slug === slug);
}

/** Featured hotels only */
export function getFeaturedHotels() {
  return demoHotels.filter((h) => h.isFeatured);
}

/** Related hotels (excluding current) */
export function getRelatedHotels(currentSlug: string, limit = 3) {
  return demoHotels.filter((h) => h.slug !== currentSlug).slice(0, limit);
}

/** All hotel slugs (for generateStaticParams) */
export function getHotelSlugs(): string[] {
  return demoHotels.map((h) => h.slug);
}

// =============================================================================
// Hotel filtering & sorting (pure function, usable from any component)
// =============================================================================

import type { HotelFilters } from "@/lib/validations";

export interface FilterableHotel {
  name: string;
  slug: string;
  shortDesc: string;
  propertyType: string;
  address: string;
  priceMin: number;
  priceMax: number;
  starRating: number;
  isVerified: boolean;
  isFeatured: boolean;
  amenities: string[];
}

export function filterAndSortHotels<T extends FilterableHotel>(
  hotels: T[],
  filters: HotelFilters
): T[] {
  let result = [...hotels];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q) ||
        h.propertyType.toLowerCase().includes(q) ||
        h.shortDesc.toLowerCase().includes(q)
    );
  }

  if (filters.propertyType) {
    result = result.filter((h) => h.propertyType === filters.propertyType);
  }

  if (filters.priceRange) {
    const [minStr, maxStr] = filters.priceRange.split("-");
    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);
    result = result.filter((h) => h.priceMin >= min && h.priceMin <= max);
  }

  if (filters.starRating) {
    result = result.filter((h) => h.starRating >= filters.starRating!);
  }

  if (filters.amenities.length > 0) {
    result = result.filter((h) =>
      filters.amenities.every((a) => h.amenities.includes(a))
    );
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    result = result.filter((h) => h.address.toLowerCase().includes(loc));
  }

  switch (filters.sortBy) {
    case "price-low":
      result.sort((a, b) => a.priceMin - b.priceMin);
      break;
    case "price-high":
      result.sort((a, b) => b.priceMin - a.priceMin);
      break;
    case "rating":
      result.sort((a, b) => b.starRating - a.starRating);
      break;
    case "featured":
    default:
      result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.starRating - a.starRating;
      });
      break;
  }

  return result;
}
