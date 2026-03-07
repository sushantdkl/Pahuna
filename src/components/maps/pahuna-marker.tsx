"use client";

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { MapPin } from "lucide-react";

interface PahunaMarkerProps {
  position: { lat: number; lng: number };
  title: string;
  /** Optional info window content */
  children?: React.ReactNode;
}

/**
 * Branded Pahuna map marker with amber pin and optional info popup.
 */
export function PahunaMarker({ position, title, children }: PahunaMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        title={title}
        onClick={() => setInfoOpen(true)}
      >
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-amber-500 p-1.5 shadow-lg shadow-amber-500/30">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="mt-0.5 h-2 w-0.5 bg-amber-500" />
        </div>
      </AdvancedMarker>

      {infoOpen && children && (
        <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)}>
          {children}
        </InfoWindow>
      )}
    </>
  );
}
