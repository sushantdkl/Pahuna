import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, MapPin } from "lucide-react";
import { type MarkerCategory } from "./map-constants";

interface PahunaInfoCardProps {
  name: string;
  href: string;
  image?: string;
  subtitle?: string;
  rating?: number;
  category?: MarkerCategory;
}

/**
 * Premium compact card shown inside map InfoWindows.
 * Displays image, name, subtitle, category badge, star rating, and link.
 */
export function PahunaInfoCard({
  name,
  href,
  image,
  subtitle,
  rating,
  category,
}: PahunaInfoCardProps) {
  return (
    <div className="flex gap-3 max-w-[300px]">
      {image ? (
        <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-lg">
          <Image src={image} alt={name} fill className="object-cover" sizes="72px" />
        </div>
      ) : (
        <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <MapPin className="h-5 w-5 text-slate-400" />
        </div>
      )}
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <p className="font-semibold text-sm leading-tight line-clamp-2" style={{ color: "#111827" }}>
          {name}
        </p>
        <div className="flex items-center gap-2">
          {subtitle && (
            <p className="text-xs truncate" style={{ color: "#6b7280" }}>
              {subtitle}
            </p>
          )}
          {rating != null && rating > 0 && (
            <div className="flex items-center gap-0.5 shrink-0">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium" style={{ color: "#374151" }}>
                {rating}
              </span>
            </div>
          )}
        </div>
        {category && (
          <span
            className="inline-flex items-center self-start rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize"
            style={{ background: "#dcfce7", color: "#166534" }}
          >
            {category}
          </span>
        )}
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-semibold mt-1 transition-colors"
          style={{ color: "#166534" }}
        >
          View details <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
