"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { type ReactNode } from "react";
import { SURKHET_CENTER, ZOOM } from "./map-constants";

interface PahunaMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  children?: ReactNode;
  className?: string;
  /** Optional label used when showing the skeleton */
  fallbackLabel?: string;
}

/**
 * Core branded map component for Pahuna.
 * Uses Leaflet + OpenStreetMap (Carto light tiles) under the hood.
 */
export function PahunaMap({
  center = SURKHET_CENTER,
  zoom = ZOOM.city,
  children,
  className = "w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden",
  fallbackLabel = "Surkhet, Nepal",
}: PahunaMapProps) {
  const centerArray: [number, number] = [center.lat, center.lng];
  const LeafletMapContainer: any = MapContainer;
  const LeafletTileLayer: any = TileLayer;

  return (
    <div className={className}>
      <LeafletMapContainer
        center={centerArray}
        zoom={zoom}
        scrollWheelZoom
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      >
        <LeafletTileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        {children}
      </LeafletMapContainer>
    </div>
  );
}
