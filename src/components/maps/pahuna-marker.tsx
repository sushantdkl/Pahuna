"use client";

import { Marker, Popup } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Marker as LeafletMarker } from "leaflet";
import L from "leaflet";
import { type MarkerCategory, CATEGORY_COLORS } from "./map-constants";

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
  const markerRef = useRef<LeafletMarker | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  // Controlled vs uncontrolled info window
  const isInfoOpen =
    controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (open: boolean) => {
    if (onOpenChange) onOpenChange(open);
    else setInternalOpen(open);
  };

  const colors = CATEGORY_COLORS[category];

  const positionArray: [number, number] = [position.lat, position.lng];

  const iconHtml = useMemo(() => {
    return `
      <div class="flex flex-col items-center group">
        <div class="relative rounded-full p-1.5 shadow-lg transition-all ${colors.bg} ${colors.shadow} ${
          isActive ? "scale-125 ring-2 ring-white ring-offset-2" : "group-hover:scale-110"
        }">
          <span class="block h-4 w-4 ${colors.text}">
            <!-- Lucide icon placeholder; visual style driven by color -->
          </span>
          ${
            label != null
              ? `<span class="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-900 shadow-sm ring-1 ring-slate-200">${label}</span>`
              : ""
          }
        </div>
        <div class="mt-0.5 h-2 w-0.5 ${colors.bg}"></div>
      </div>
    `;
  }, [colors.bg, colors.shadow, colors.text, isActive, label]);

  const icon = useMemo(
    () =>
      L.divIcon({
        html: iconHtml,
        className: "pahuna-marker", // avoid default Leaflet icon styles
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -28],
      }),
    [iconHtml],
  );

  useEffect(() => {
    const m = markerRef.current;
    if (!m) return;
    if (isInfoOpen) m.openPopup();
    else m.closePopup();
  }, [isInfoOpen]);

  return (
    <Marker
      ref={markerRef as unknown as React.Ref<LeafletMarker>}
      position={positionArray}
      icon={icon}
      title={title}
      eventHandlers={{
        click: () => setOpen(!isInfoOpen),
        popupclose: () => setOpen(false),
      }}
    >
      {children && (
        <Popup>
          {children}
        </Popup>
      )}
    </Marker>
  );
}
