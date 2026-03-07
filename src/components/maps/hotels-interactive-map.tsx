"use client";

import { GoogleMapsProvider } from "./google-maps-provider";
import { PahunaMap } from "./pahuna-map";
import { PahunaMarker } from "./pahuna-marker";
import { PahunaInfoCard } from "./pahuna-info-card";
import { SURKHET_CENTER, ZOOM } from "./map-constants";

interface InteractiveHotel {
  name: string;
  slug: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  starRating?: number;
  propertyType?: string;
}

interface HotelsInteractiveMapProps {
  hotels: InteractiveHotel[];
  selectedSlug: string | null;
  onSelectHotel: (slug: string | null) => void;
  className?: string;
}

/**
 * Interactive hotel map with bidirectional selection.
 * Clicking a marker selects it; selection is controlled externally.
 */
export function HotelsInteractiveMap({
  hotels,
  selectedSlug,
  onSelectHotel,
  className,
}: HotelsInteractiveMapProps) {
  const mappable = hotels.filter((h) => h.latitude && h.longitude);

  if (mappable.length === 0) return null;

  return (
    <GoogleMapsProvider>
      <PahunaMap
        center={SURKHET_CENTER}
        zoom={ZOOM.area}
        className={
          className ??
          "w-full h-full min-h-[300px] rounded-xl overflow-hidden"
        }
        fallbackLabel="Hotels in Surkhet"
      >
        {mappable.map((hotel) => (
          <PahunaMarker
            key={hotel.slug}
            position={{ lat: hotel.latitude!, lng: hotel.longitude! }}
            title={hotel.name}
            category="hotel"
            isActive={selectedSlug === hotel.slug}
            isOpen={selectedSlug === hotel.slug}
            onOpenChange={(open) =>
              onSelectHotel(open ? hotel.slug : null)
            }
          >
            <PahunaInfoCard
              name={hotel.name}
              href={`/hotels/${hotel.slug}`}
              image={hotel.images?.[0]}
              subtitle={hotel.propertyType}
              rating={hotel.starRating}
              category="hotel"
            />
          </PahunaMarker>
        ))}
      </PahunaMap>
    </GoogleMapsProvider>
  );
}
