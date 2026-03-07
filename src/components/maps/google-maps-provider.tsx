"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { type ReactNode, createContext, useContext, useMemo } from "react";

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

interface MapContextValue {
  hasApiKey: boolean;
}

const MapContext = createContext<MapContextValue>({ hasApiKey: false });

/** Hook to check Google Maps availability from any child component */
export function useMapContext() {
  return useContext(MapContext);
}

interface GoogleMapsProviderProps {
  children: ReactNode;
}

/**
 * Wraps children with the Google Maps APIProvider and a MapContext.
 * If no API key is configured, renders children without the provider
 * so map components can show their own fallback UI.
 */
export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const value = useMemo<MapContextValue>(
    () => ({ hasApiKey: Boolean(MAPS_API_KEY) }),
    [],
  );

  if (!MAPS_API_KEY) {
    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
  }

  return (
    <MapContext.Provider value={value}>
      <APIProvider apiKey={MAPS_API_KEY}>{children}</APIProvider>
    </MapContext.Provider>
  );
}

/** Check if a Google Maps API key is configured */
export function hasGoogleMapsKey(): boolean {
  return Boolean(MAPS_API_KEY);
}
