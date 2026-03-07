"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Map as MapIcon,
  List,
  Hotel,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HotelCard } from "./hotel-card";
import { HotelFilterBar } from "./hotel-filters";
import { HotelsInteractiveMap } from "@/components/maps/hotels-interactive-map";
import { PahunaDirections } from "@/components/maps/pahuna-directions";
import { filterAndSortHotels } from "@/services/hotels";
import { EmptyState } from "@/components/shared/empty-state";
import type { HotelFilters } from "@/lib/validations";

interface ExplorerHotel {
  name: string;
  slug: string;
  shortDesc: string;
  propertyType: string;
  address: string;
  priceMin: number;
  priceMax: number;
  starRating: number;
  isVerified: boolean;
  isFeatured: boolean;
  amenities: string[];
  images: string[];
  latitude?: number;
  longitude?: number;
}

interface HotelsExplorerProps {
  hotels: ExplorerHotel[];
}

/**
 * Interactive Hotels explorer — list + map with bidirectional selection,
 * filters, mobile list/map toggle, and "Get Directions" support.
 */
export function HotelsExplorer({ hotels }: HotelsExplorerProps) {
  const [filters, setFilters] = useState<HotelFilters>({
    search: "",
    propertyType: null,
    priceRange: null,
    starRating: null,
    amenities: [],
    location: "",
    sortBy: "featured",
  });

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredHotels = useMemo(
    () => filterAndSortHotels(hotels, filters),
    [hotels, filters],
  );

  // Scroll selected card into view (when map marker is clicked)
  useEffect(() => {
    if (selectedSlug && cardRefs.current[selectedSlug]) {
      cardRefs.current[selectedSlug]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedSlug]);

  const selectedHotel = selectedSlug
    ? hotels.find((h) => h.slug === selectedSlug)
    : null;

  return (
    <div>
      {/* ── Filters ── */}
      <HotelFilterBar
        filters={filters}
        onChange={setFilters}
        totalResults={filteredHotels.length}
        totalHotels={hotels.length}
      />

      {/* ── Mobile view toggle ── */}
      <div className="flex items-center justify-between mt-6 lg:hidden">
        <div className="flex rounded-lg border p-0.5">
          <Button
            variant={mobileView === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMobileView("list")}
            className="gap-1.5"
          >
            <List className="h-4 w-4" /> List
          </Button>
          <Button
            variant={mobileView === "map" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMobileView("map")}
            className="gap-1.5"
          >
            <MapIcon className="h-4 w-4" /> Map
          </Button>
        </div>
        {selectedHotel?.latitude && selectedHotel?.longitude && (
          <PahunaDirections
            lat={selectedHotel.latitude}
            lng={selectedHotel.longitude}
          />
        )}
      </div>

      {/* ── Desktop: side-by-side | Mobile: toggle ── */}
      <div className="mt-6 lg:grid lg:grid-cols-5 lg:gap-6">
        {/* Hotel cards — left panel */}
        <div
          className={`lg:col-span-3 ${
            mobileView === "map" ? "hidden lg:block" : ""
          }`}
        >
          {filteredHotels.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-5 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto lg:pr-2">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.slug}
                  ref={(el) => {
                    cardRefs.current[hotel.slug] = el;
                  }}
                  onMouseEnter={() => setSelectedSlug(hotel.slug)}
                  onMouseLeave={() => setSelectedSlug(null)}
                >
                  <HotelCard
                    name={hotel.name}
                    slug={hotel.slug}
                    shortDesc={hotel.shortDesc}
                    propertyType={hotel.propertyType}
                    address={hotel.address}
                    priceMin={hotel.priceMin}
                    priceMax={hotel.priceMax}
                    starRating={hotel.starRating}
                    isVerified={hotel.isVerified}
                    isFeatured={hotel.isFeatured}
                    amenities={hotel.amenities}
                    coverImage={hotel.images?.[0]}
                    isActive={selectedSlug === hotel.slug}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Hotel className="h-14 w-14" />}
              title="No hotels match your filters"
              description="Try adjusting your search criteria or clearing some filters."
              action={{ label: "View All Hotels", href: "/hotels" }}
            />
          )}

          {/* List Your Hotel CTA */}
          <Card className="mt-8 border-dashed border-primary/30 bg-primary/5">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold mb-1">
                  Own a hotel in Surkhet?
                </h3>
                <p className="text-sm text-muted-foreground">
                  List your property for free. Verified listings get
                  priority placement.
                </p>
              </div>
              <Button asChild>
                <Link href="/partner/hotels">
                  List Your Hotel <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Map — right panel (sticky on desktop) */}
        <div
          className={`lg:col-span-2 ${
            mobileView === "list" ? "hidden lg:block" : ""
          }`}
        >
          <div className="lg:sticky lg:top-20 rounded-xl overflow-hidden">
            <HotelsInteractiveMap
              hotels={filteredHotels}
              selectedSlug={selectedSlug}
              onSelectHotel={(slug) => {
                setSelectedSlug(slug);
                // On mobile, auto-switch to list when a marker is tapped
                if (slug && mobileView === "map") {
                  setMobileView("list");
                }
              }}
              className="w-full h-[50vh] lg:h-[calc(100vh-220px)] rounded-xl overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
