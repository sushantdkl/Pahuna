import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  DataTableCard,
  StatusBadge,
} from "@/components/dashboard/data-table-card";
import { Briefcase, MessageSquare, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export default async function DashboardConsultingPage() {
  await requireRole(["ADMIN", "CONSULTING_MANAGER"]);

  const [serviceCount, leadCount, newLeadCount, recentLeads] =
    await Promise.all([
      db.consultingService.count({ where: { isActive: true } }),
      db.consultingLead.count(),
      db.consultingLead.count({ where: { status: "NEW" } }),
      db.consultingLead.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const rows = recentLeads.map((l) => ({
    id: l.id,
    contactName: l.contactName,
    businessName: l.businessName,
    email: l.email,
    service: l.serviceType,
    status: l.status,
    date: format(l.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Consulting</h1>
        <p className="text-sm text-muted-foreground">
          B2B consulting services and leads
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Active Services"
          value={serviceCount}
          icon={Briefcase}
        />
        <StatCard
          title="Total Leads"
          value={leadCount}
          icon={MessageSquare}
        />
        <StatCard
          title="New Leads"
          value={newLeadCount}
          subtitle="Awaiting contact"
          icon={TrendingUp}
        />
      </div>

      <DataTableCard
        title="Consulting Leads"
        description="All B2B consulting inquiries"
        data={rows}
        emptyMessage="No consulting leads yet"
        columns={[
          { header: "Contact", accessorKey: "contactName" },
          { header: "Business", accessorKey: "businessName", className: "hidden sm:table-cell" },
          { header: "Service", accessorKey: "service" },
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
