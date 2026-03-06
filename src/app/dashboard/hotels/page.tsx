import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  DataTableCard,
  StatusBadge,
} from "@/components/dashboard/data-table-card";
import { Hotel, MessageSquare, Star } from "lucide-react";
import { format } from "date-fns";

export default async function DashboardHotelsPage() {
  await requireRole(["ADMIN", "EDITOR", "HOTEL_PARTNER"]);

  const [hotelCount, activeCount, inquiryCount, recentInquiries] =
    await Promise.all([
      db.hotel.count(),
      db.hotel.count({ where: { status: "PUBLISHED" } }),
      db.inquiry.count(),
      db.inquiry.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { hotel: { select: { name: true } } },
      }),
    ]);

  const rows = recentInquiries.map((i) => ({
    id: i.id,
    fullName: i.fullName,
    email: i.email,
    hotel: i.hotel?.name ?? "General",
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

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Hotels" value={hotelCount} icon={Hotel} />
        <StatCard title="Active Listings" value={activeCount} icon={Star} />
        <StatCard
          title="Inquiries"
          value={inquiryCount}
          icon={MessageSquare}
        />
      </div>

      <DataTableCard
        title="Hotel Inquiries"
        description="All hotel booking and general inquiries"
        data={rows}
        emptyMessage="No inquiries yet"
        columns={[
          { header: "Guest", accessorKey: "fullName" },
          { header: "Email", accessorKey: "email", className: "hidden md:table-cell" },
          { header: "Hotel", accessorKey: "hotel" },
          {
            header: "Status",
            accessorKey: "status",
            cell: (val) => <StatusBadge status={String(val)} />,
          },
          { header: "Date", accessorKey: "date", className: "hidden sm:table-cell" },
        ]}
      />
    </div>
  );
}
