import { Container } from "@/components/layout";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-7 w-16 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
            </div>
          </div>
        ))}
      </div>
      {/* Table skeleton */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded bg-muted/50" />
          ))}
        </div>
      </div>
    </div>
  );
}
