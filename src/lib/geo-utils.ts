/**
 * Geographic utility — Haversine distance between two coordinate pairs.
 */
export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface NearbyPlace {
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  category: string;
  coverImage?: string;
  subtitle?: string;
  href: string;
  distanceKm: number;
}

/**
 * Find places within `maxDistanceKm` of a given coordinate.
 * Returns results sorted by distance ascending.
 */
export function findNearbyPlaces(
  lat: number,
  lng: number,
  places: Array<{
    name: string;
    slug: string;
    latitude?: number;
    longitude?: number;
    category: string;
    coverImage?: string;
    subtitle?: string;
    href: string;
  }>,
  maxDistanceKm = 10,
): NearbyPlace[] {
  return places
    .filter((p) => p.latitude != null && p.longitude != null)
    .map((p) => ({
      ...p,
      latitude: p.latitude!,
      longitude: p.longitude!,
      distanceKm: distanceKm(lat, lng, p.latitude!, p.longitude!),
    }))
    .filter((p) => p.distanceKm <= maxDistanceKm && p.distanceKm > 0.01)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
