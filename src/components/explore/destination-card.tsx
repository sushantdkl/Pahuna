import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  name: string;
  slug: string;
  shortDesc: string;
  coverImage?: string;
  bestSeason?: string;
  entryFee?: string;
  category?: string;
  isFeatured?: boolean;
  /** Visual highlight ring when selected/hovered from the map */
  isActive?: boolean;
}

export function DestinationCard({
  name,
  slug,
  shortDesc,
  coverImage,
  bestSeason,
  entryFee,
  category,
  isFeatured,
  isActive,
}: DestinationCardProps) {
  return (
    <Link href={`/explore#${slug}`}>
      <Card
        className={cn(
          "group overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full",
          isActive && "ring-2 ring-primary shadow-xl -translate-y-0.5",
        )}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-emerald-400" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            {category && (
              <Badge
                variant="secondary"
                className="bg-white/90 text-foreground text-xs capitalize"
              >
                {category}
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Featured
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {shortDesc}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {bestSeason && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {bestSeason}
              </span>
            )}
            {entryFee && (
              <span className="font-medium text-foreground">{entryFee}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
