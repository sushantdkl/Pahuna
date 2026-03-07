"use client";

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import {
  MapPin,
  Hotel,
  Mountain,
  Compass,
  Landmark,
  Waves,
  UtensilsCrossed,
  Route,
  Building2,
} from "lucide-react";
import {
  type MarkerCategory,
  CATEGORY_COLORS,
} from "./map-constants";
import { cn } from "@/lib/utils";

/** Map category names to Lucide icon components */
const CATEGORY_ICONS: Record<MarkerCategory, React.ElementType> = {
  hotel: Hotel,
  destination: Mountain,
  experience: Compass,
  temple: Landmark,
  lake: Waves,
  restaurant: UtensilsCrossed,
  itinerary: Route,
  office: Building2,
  default: MapPin,
};

interface PahunaMarkerProps {
  position: { lat: number; lng: number };
  title: string;
  /** Category determines the pin color and icon */
  category?: MarkerCategory;
  /** Optional numbered label (e.g. day number on route maps) */
  label?: string | number;
  /** Optional info window content */
  children?: React.ReactNode;
  /** Controlled info-window open state (omit for uncontrolled) */
  isOpen?: boolean;
  /** Callback when info-window open state changes (controlled mode) */
  onOpenChange?: (open: boolean) => void;
  /** Visual highlight — scales up the pin with a glow ring */
  isActive?: boolean;
}

/**
 * Branded Pahuna map marker with category-specific color and icon.
 * Supports controlled or uncontrolled info window, numbered label, and active highlight.
 */
export function PahunaMarker({
  position,
  title,
  category = "default",
  label,
  children,
  isOpen: controlledOpen,
  onOpenChange,
  isActive,
}: PahunaMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [internalOpen, setInternalOpen] = useState(false);

  // Controlled vs uncontrolled info window
  const isInfoOpen =
    controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (open: boolean) => {
    if (onOpenChange) onOpenChange(open);
    else setInternalOpen(open);
  };

  const colors = CATEGORY_COLORS[category];
  const Icon = CATEGORY_ICONS[category];

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        title={title}
        onClick={() => setOpen(!isInfoOpen)}
        zIndex={isActive ? 100 : undefined}
      >
        <div className="flex flex-col items-center group">
          <div
            className={cn(
              "relative rounded-full p-1.5 shadow-lg transition-all",
              colors.bg,
              colors.shadow,
              isActive
                ? "scale-125 ring-2 ring-white ring-offset-2"
                : "group-hover:scale-110",
            )}
          >
            <Icon className={`h-4 w-4 ${colors.text}`} />
            {label != null && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-900 shadow-sm ring-1 ring-slate-200">
                {label}
              </span>
            )}
          </div>
          <div className={`mt-0.5 h-2 w-0.5 ${colors.bg}`} />
        </div>
      </AdvancedMarker>

      {isInfoOpen && children && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
          {children}
        </InfoWindow>
      )}
    </>
  );
}
