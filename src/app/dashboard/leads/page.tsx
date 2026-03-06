import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  DataTableCard,
  StatusBadge,
} from "@/components/dashboard/data-table-card";
import { MessageSquare, Briefcase, Hotel } from "lucide-react";
import { format } from "date-fns";

export default async function DashboardLeadsPage() {
  await requireRole(["ADMIN", "HOTEL_PARTNER", "CONSULTING_MANAGER"]);

  const [inquiryCount, consultingLeadCount, recentInquiries, recentLeads] =
    await Promise.all([
      db.inquiry.count(),
      db.consultingLead.count(),
      db.inquiry.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: { hotel: { select: { name: true } } },
      }),
      db.consultingLead.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const inquiryRows = recentInquiries.map((i) => ({
    id: i.id,
    fullName: i.fullName,
    email: i.email,
    hotel: i.hotel?.name ?? "General",
    status: i.status,
    date: format(i.createdAt, "MMM d, yyyy"),
  }));

  const leadRows = recentLeads.map((l) => ({
    id: l.id,
    contactName: l.contactName,
    businessName: l.businessName,
    service: l.serviceType,
    status: l.status,
    date: format(l.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
        <p className="text-sm text-muted-foreground">
          Hotel inquiries and consulting leads
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          title="Hotel Inquiries"
          value={inquiryCount}
          icon={Hotel}
        />
        <StatCard
          title="Consulting Leads"
          value={consultingLeadCount}
          icon={Briefcase}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DataTableCard
          title="Hotel Inquiries"
          data={inquiryRows}
          emptyMessage="No inquiries yet"
          columns={[
            { header: "Guest", accessorKey: "fullName" },
            { header: "Hotel", accessorKey: "hotel" },
            {
              header: "Status",
              accessorKey: "status",
              cell: (val) => <StatusBadge status={String(val)} />,
            },
            { header: "Date", accessorKey: "date", className: "hidden sm:table-cell" },
          ]}
        />

        <DataTableCard
          title="Consulting Leads"
          data={leadRows}
          emptyMessage="No consulting leads yet"
          columns={[
            { header: "Contact", accessorKey: "contactName" },
            { header: "Business", accessorKey: "businessName", className: "hidden sm:table-cell" },
            {
              header: "Status",
              accessorKey: "status",
              cell: (val) => <StatusBadge status={String(val)} />,
            },
            { header: "Date", accessorKey: "date", className: "hidden sm:table-cell" },
          ]}
        />
      </div>
    </div>
  );
}
