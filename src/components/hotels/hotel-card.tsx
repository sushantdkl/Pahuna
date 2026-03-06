import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Wifi, Car, UtensilsCrossed, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface HotelCardProps {
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
  coverImage?: string;
}

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-3.5 w-3.5" />,
  Parking: <Car className="h-3.5 w-3.5" />,
  Restaurant: <UtensilsCrossed className="h-3.5 w-3.5" />,
};

export function HotelCard({
  name,
  slug,
  shortDesc,
  propertyType,
  address,
  priceMin,
  priceMax,
  starRating,
  isVerified,
  isFeatured,
  amenities,
  coverImage,
}: HotelCardProps) {
  return (
    <Card className="group overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent z-10" />
        {coverImage ? (
          <Image
            src={coverImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-4xl">🏨</span>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <Badge variant="secondary" className="bg-white/95 text-foreground text-xs font-medium shadow-sm backdrop-blur-sm">
            {propertyType}
          </Badge>
          {isFeatured && (
            <Badge className="bg-primary text-primary-foreground text-xs shadow-sm">
              Featured
            </Badge>
          )}
        </div>
        {isVerified && (
          <div className="absolute top-3 right-3 z-20">
            <div className="flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-xs text-white font-medium shadow-sm backdrop-blur-sm">
              <CheckCircle className="h-3 w-3" />
              Verified
            </div>
          </div>
        )}
        {/* Price */}
        <div className="absolute bottom-3 right-3 z-20">
          <div className="rounded-xl bg-white/95 backdrop-blur-sm px-3.5 py-2 text-right shadow-md">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">from</div>
            <div className="text-lg font-bold text-foreground leading-tight">
              {formatPrice(priceMin)}
            </div>
            <div className="text-[10px] text-muted-foreground">per night</div>
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-2.5" role="img" aria-label={`${starRating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < starRating
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/20"
              }`}
            />
          ))}
          <span className="ml-1.5 text-xs text-muted-foreground">{starRating}.0</span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold leading-tight mb-1.5 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/60" />
          <span className="truncate">{address}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {shortDesc}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground/70"
            >
              {amenityIcons[amenity]}
              {amenity}
            </span>
          ))}
          {amenities.length > 4 && (
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
              +{amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Action */}
        <Button asChild className="w-full" size="sm">
          <Link href={`/hotels/${slug}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
