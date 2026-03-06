import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  DataTableCard,
  StatusBadge,
} from "@/components/dashboard/data-table-card";
import { Handshake, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default async function DashboardPartnersPage() {
  await requireRole(["ADMIN"]);

  const [totalCount, pendingCount, approvedCount, recentApplications] =
    await Promise.all([
      db.partnerApplication.count(),
      db.partnerApplication.count({ where: { status: "PENDING" } }),
      db.partnerApplication.count({ where: { status: "APPROVED" } }),
      db.partnerApplication.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const rows = recentApplications.map((a) => ({
    id: a.id,
    businessName: a.businessName,
    ownerName: a.ownerName,
    email: a.email,
    type: a.partnerType,
    status: a.status,
    date: format(a.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Partners</h1>
        <p className="text-sm text-muted-foreground">
          Partnership applications and approvals
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Applications"
          value={totalCount}
          icon={Handshake}
        />
        <StatCard
          title="Pending Review"
          value={pendingCount}
          icon={Clock}
        />
        <StatCard
          title="Approved"
          value={approvedCount}
          icon={CheckCircle}
        />
      </div>

      <DataTableCard
        title="Partner Applications"
        description="All partnership requests"
        data={rows}
        emptyMessage="No applications yet"
        columns={[
          { header: "Business", accessorKey: "businessName" },
          { header: "Owner", accessorKey: "ownerName", className: "hidden sm:table-cell" },
          { header: "Type", accessorKey: "type" },
          {
            header: "Status",
            accessorKey: "status",
            cell: (val) => <StatusBadge status={String(val)} />,
          },
          { header: "Date", accessorKey: "date", className: "hidden md:table-cell" },
        ]}
      />
    </div>
  );
}
