"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { type ReactNode } from "react";

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

interface GoogleMapsProviderProps {
  children: ReactNode;
}

/**
 * Wraps children with the Google Maps APIProvider.
 * If no API key is configured, renders children without the provider
 * so map components can show their own fallback UI.
 */
export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  if (!MAPS_API_KEY) {
    return <>{children}</>;
  }

  return (
    <APIProvider apiKey={MAPS_API_KEY}>{children}</APIProvider>
  );
}

/** Check if a Google Maps API key is configured */
export function hasGoogleMapsKey(): boolean {
  return Boolean(MAPS_API_KEY);
}
