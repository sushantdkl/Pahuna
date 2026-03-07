// Pahuna Maps — Constants & Branded Styling

/** Center of Surkhet / Birendranagar */
export const SURKHET_CENTER = { lat: 28.6, lng: 81.6167 };

/** Default zoom levels for different views */
export const ZOOM = {
  city: 13,
  area: 14,
  detail: 16,
} as const;

/** Google Maps map ID — use a cloud-styled map or leave empty for default */
export const MAP_ID = "PAHUNA_MAP";

/**
 * Category types for map markers — each maps to a unique color + icon.
 */
export type MarkerCategory =
  | "hotel"
  | "destination"
  | "experience"
  | "temple"
  | "lake"
  | "restaurant"
  | "itinerary"
  | "office"
  | "default";

/**
 * Category pin colors — Tailwind class names for bg and shadow.
 * Each category gets a distinct color for visual differentiation.
 */
export const CATEGORY_COLORS: Record<
  MarkerCategory,
  { bg: string; shadow: string; text: string }
> = {
  hotel: { bg: "bg-amber-500", shadow: "shadow-amber-500/30", text: "text-white" },
  destination: { bg: "bg-emerald-500", shadow: "shadow-emerald-500/30", text: "text-white" },
  experience: { bg: "bg-violet-500", shadow: "shadow-violet-500/30", text: "text-white" },
  temple: { bg: "bg-orange-500", shadow: "shadow-orange-500/30", text: "text-white" },
  lake: { bg: "bg-sky-500", shadow: "shadow-sky-500/30", text: "text-white" },
  restaurant: { bg: "bg-rose-500", shadow: "shadow-rose-500/30", text: "text-white" },
  itinerary: { bg: "bg-indigo-500", shadow: "shadow-indigo-500/30", text: "text-white" },
  office: { bg: "bg-slate-700", shadow: "shadow-slate-700/30", text: "text-white" },
  default: { bg: "bg-amber-500", shadow: "shadow-amber-500/30", text: "text-white" },
};

/**
 * Branded dark-navy map styles matching the Pahuna banner palette.
 * Used as fallback when no cloud-based Map ID is set.
 */
export const PAHUNA_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1e293b" }] }, // slate-800
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] }, // slate-900
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] }, // slate-400
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#334155" }], // slate-700
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#334155" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#cbd5e1" }], // slate-300
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#1e3a5f" }], // deep navy
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64748b" }], // slate-500
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1a3329" }], // dark green
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
];
