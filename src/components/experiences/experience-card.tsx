import Link from "next/link";
import Image from "next/image";
import { Clock, Mountain, DollarSign, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  title: string;
  slug: string;
  shortDesc: string;
  coverImage?: string;
  category?: string;
  duration?: string;
  difficulty?: string;
  priceRange?: string;
  isFeatured?: boolean;
  /** Visual highlight ring when selected/hovered from the map */
  isActive?: boolean;
}

export function ExperienceCard({
  title,
  slug,
  shortDesc,
  coverImage,
  category,
  duration,
  difficulty,
  priceRange,
  isFeatured,
  isActive,
}: ExperienceCardProps) {
  return (
    <Link href={`/experiences#${slug}`}>
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
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-violet-500/20 to-violet-500/5 flex items-center justify-center">
              <Compass className="h-8 w-8 text-violet-400" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            {category && (
              <Badge className="bg-white/90 text-foreground text-xs">
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
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {shortDesc}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
            {duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {duration}
              </span>
            )}
            {difficulty && (
              <span className="flex items-center gap-1">
                <Mountain className="h-3.5 w-3.5" /> {difficulty}
              </span>
            )}
            {priceRange && (
              <span className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" /> {priceRange}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
