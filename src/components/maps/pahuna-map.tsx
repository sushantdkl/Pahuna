"use client";

import { Map } from "@vis.gl/react-google-maps";
import { type ReactNode } from "react";
import { MapPin } from "lucide-react";
import { SURKHET_CENTER, ZOOM, PAHUNA_MAP_STYLES } from "./map-constants";
import { hasGoogleMapsKey } from "./google-maps-provider";

interface PahunaMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  children?: ReactNode;
  className?: string;
  /** Fallback text when no API key is available */
  fallbackLabel?: string;
}

/**
 * Core branded map component for Pahuna.
 * Shows a styled Google Map or a branded fallback when API key is missing.
 */
export function PahunaMap({
  center = SURKHET_CENTER,
  zoom = ZOOM.city,
  children,
  className = "w-full h-[400px] rounded-xl overflow-hidden",
  fallbackLabel = "Surkhet, Nepal",
}: PahunaMapProps) {
  if (!hasGoogleMapsKey()) {
    return (
      <div
        className={`${className} bg-slate-900 flex flex-col items-center justify-center gap-3 border border-slate-700`}
      >
        <MapPin className="h-8 w-8 text-amber-400" />
        <p className="text-slate-300 text-sm font-medium">{fallbackLabel}</p>
        <p className="text-slate-500 text-xs">Map loads when API key is configured</p>
      </div>
    );
  }

  return (
    <Map
      defaultCenter={center}
      defaultZoom={zoom}
      gestureHandling="cooperative"
      disableDefaultUI
      className={className}
      styles={PAHUNA_MAP_STYLES}
    >
      {children}
    </Map>
  );
}
