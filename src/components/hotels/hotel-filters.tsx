"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES, PRICE_RANGES, STAR_RATINGS } from "@/lib/constants";
import type { HotelFilters } from "@/lib/validations";

// Amenities that exist in our demo data
const AMENITY_OPTIONS = [
  "WiFi",
  "Parking",
  "Restaurant",
  "Room Service",
  "AC",
  "Hot Water",
  "Swimming Pool",
  "Spa",
  "Gym",
  "Bar",
  "Garden",
  "Conference Hall",
  "Laundry",
  "TV",
  "Travel Desk",
];

interface HotelFilterBarProps {
  filters: HotelFilters;
  onChange: (filters: HotelFilters) => void;
  totalResults: number;
  totalHotels: number;
}

export function HotelFilterBar({
  filters,
  onChange,
  totalResults,
  totalHotels,
}: HotelFilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.propertyType) count++;
    if (filters.priceRange) count++;
    if (filters.starRating) count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    if (filters.location) count++;
    return count;
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof HotelFilters>(key: K, value: HotelFilters[K]) => {
      onChange({ ...filters, [key]: value });
    },
    [filters, onChange]
  );

  const toggleAmenity = useCallback(
    (amenity: string) => {
      const current = filters.amenities;
      const updated = current.includes(amenity)
        ? current.filter((a) => a !== amenity)
        : [...current, amenity];
      updateFilter("amenities", updated);
    },
    [filters.amenities, updateFilter]
  );

  const clearAll = useCallback(() => {
    onChange({
      search: "",
      propertyType: null,
      priceRange: null,
      starRating: null,
      amenities: [],
      location: "",
      sortBy: "featured",
    });
  }, [onChange]);

  return (
    <div className="space-y-4">
      {/* ── Search Bar ── */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search hotels by name, area, or type..."
            className="pl-10"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter("search", "")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={showAdvanced ? "secondary" : "outline"}
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* ── Quick Filter Tags (property types) ── */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Property type filters">
        <button
          type="button"
          onClick={() => updateFilter("propertyType", null)}
          aria-pressed={!filters.propertyType}
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
            !filters.propertyType
              ? "border-transparent bg-primary text-primary-foreground"
              : "border-border hover:bg-accent"
          }`}
        >
          All Types
        </button>
        {PROPERTY_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() =>
              updateFilter(
                "propertyType",
                filters.propertyType === type.value ? null : type.value
              )
            }
            aria-pressed={filters.propertyType === type.value}
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              filters.propertyType === type.value
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border hover:bg-accent"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* ── Advanced Filters Panel ── */}
      {showAdvanced && (
        <div className="rounded-xl border bg-muted/30 p-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Price Range</label>
              <Select
                value={filters.priceRange || "__all__"}
                onValueChange={(v) =>
                  updateFilter("priceRange", v === "__all__" ? null : v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">Any price</SelectItem>
                  {PRICE_RANGES.map((range) => (
                    <SelectItem key={range.label} value={`${range.min}-${range.max}`}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Star Rating */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Star Rating</label>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateFilter("starRating", null)}
                  className={`rounded-md border px-2.5 py-1.5 text-xs transition-colors ${
                    !filters.starRating
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  Any
                </button>
                {STAR_RATINGS.map((star) => (
                  <button
                    key={star}
                    onClick={() =>
                      updateFilter("starRating", filters.starRating === star ? null : star)
                    }
                    className={`flex items-center gap-0.5 rounded-md border px-2 py-1.5 text-xs transition-colors ${
                      filters.starRating === star
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    {star}
                    <Star className="h-3 w-3 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  placeholder="Area or address..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="text-sm font-medium mb-2 block">Amenities</label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Amenity filters">
              {AMENITY_OPTIONS.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  aria-pressed={filters.amenities.includes(amenity)}
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    filters.amenities.includes(amenity)
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Clear All */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active
              </p>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <X className="h-3.5 w-3.5 mr-1" /> Clear All
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── Results Count + Sort ── */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{totalResults}</span>{" "}
          of {totalHotels} properties
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <Select
            value={filters.sortBy}
            onValueChange={(v) => updateFilter("sortBy", v as HotelFilters["sortBy"])}
          >
            <SelectTrigger className="w-[150px] h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low → High</SelectItem>
              <SelectItem value="price-high">Price: High → Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
