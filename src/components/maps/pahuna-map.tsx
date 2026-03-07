"use client";

import { Map } from "@vis.gl/react-google-maps";
import { type ReactNode, Suspense } from "react";
import { MapPin, WifiOff } from "lucide-react";
import { SURKHET_CENTER, ZOOM, PAHUNA_MAP_STYLES } from "./map-constants";
import { hasGoogleMapsKey } from "./google-maps-provider";
import { MapSkeleton } from "./map-skeleton";

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
 * Shows a styled Google Map, a loading skeleton while initializing,
 * or a branded fallback when API key is missing.
 */
export function PahunaMap({
  center = SURKHET_CENTER,
  zoom = ZOOM.city,
  children,
  className = "w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden",
  fallbackLabel = "Surkhet, Nepal",
}: PahunaMapProps) {
  if (!hasGoogleMapsKey()) {
    return (
      <div
        className={`${className} bg-linear-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center gap-3 border border-slate-700/60`}
      >
        <div className="rounded-full bg-amber-500/10 p-3">
          <MapPin className="h-6 w-6 text-amber-400" />
        </div>
        <p className="text-slate-300 text-sm font-medium text-center px-4">
          {fallbackLabel}
        </p>
        <div className="flex items-center gap-1.5 text-slate-500">
          <WifiOff className="h-3 w-3" />
          <p className="text-xs">Map available when API key is configured</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<MapSkeleton className={className} />}>
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
    </Suspense>
  );
}
