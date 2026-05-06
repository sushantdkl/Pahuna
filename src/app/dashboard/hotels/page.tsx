import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { Hotel, MessageSquare, Star, MapPin } from "lucide-react";
import { format } from "date-fns";
import { HotelsContent } from "./hotels-content";

export default async function DashboardHotelsPage() {
  await requireRole(["ADMIN", "EDITOR", "HOTEL_PARTNER"]);

  const [hotelCount, activeCount, inquiryCount, newInquiryCount, hotelsWithCoords, recentInquiries] =
    await Promise.all([
      db.hotel.count(),
      db.hotel.count({ where: { status: "PUBLISHED" } }),
      db.inquiry.count(),
      db.inquiry.count({ where: { status: "NEW" } }),
      db.hotel.count({ where: { latitude: { not: null }, longitude: { not: null } } }),
      db.inquiry.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
        include: { hotel: { select: { name: true } } },
      }),
    ]);

  const rows = recentInquiries.map((i: any) => ({
    id: i.id,
    fullName: i.fullName,
    email: i.email,
    phone: i.phone ?? "—",
    hotel: i.hotel?.name ?? "General",
    type: i.type,
    status: i.status,
    date: format(i.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hotels</h1>
        <p className="text-sm text-muted-foreground">
          Manage hotel listings and inquiries
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard title="Total Hotels" value={hotelCount} icon={Hotel} />
        <StatCard title="Active Listings" value={activeCount} icon={Star} />
        <StatCard
          title="Inquiries"
          value={inquiryCount}
          subtitle={newInquiryCount > 0 ? `${newInquiryCount} new` : undefined}
          icon={MessageSquare}
        />
        <StatCard
          title="Map Coverage"
          value={`${hotelCount > 0 ? Math.round((hotelsWithCoords / hotelCount) * 100) : 0}%`}
          subtitle={`${hotelsWithCoords}/${hotelCount} have coordinates`}
          icon={MapPin}
        />
      </div>

      <HotelsContent inquiries={rows} totalCount={inquiryCount} />
    </div>
  );
}
