import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

interface PahunaInfoCardProps {
  name: string;
  href: string;
  image?: string;
  subtitle?: string;
  rating?: number;
}

/**
 * Compact card shown inside map InfoWindows.
 */
export function PahunaInfoCard({
  name,
  href,
  image,
  subtitle,
  rating,
}: PahunaInfoCardProps) {
  return (
    <div className="flex gap-3 max-w-[280px] p-1">
      {image && (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
          <Image src={image} alt={name} fill className="object-cover" sizes="64px" />
        </div>
      )}
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <p className="font-semibold text-sm text-slate-900 truncate">{name}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 truncate">{subtitle}</p>
        )}
        {rating && (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-600">{rating}</span>
          </div>
        )}
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 mt-0.5"
        >
          View details <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
