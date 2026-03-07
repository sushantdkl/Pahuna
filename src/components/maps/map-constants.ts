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
