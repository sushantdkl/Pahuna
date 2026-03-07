import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { Briefcase, MessageSquare, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ConsultingContent } from "./consulting-content";

export default async function DashboardConsultingPage() {
  await requireRole(["ADMIN", "CONSULTING_MANAGER"]);

  const [serviceCount, leadCount, newLeadCount, qualifiedCount, recentLeads] =
    await Promise.all([
      db.consultingService.count({ where: { isActive: true } }),
      db.consultingLead.count(),
      db.consultingLead.count({ where: { status: "NEW" } }),
      db.consultingLead.count({ where: { status: "QUALIFIED" } }),
      db.consultingLead.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const rows = recentLeads.map((l) => ({
    id: l.id,
    contactName: l.contactName,
    businessName: l.businessName,
    email: l.email,
    phone: l.phone ?? "—",
    service: l.serviceType,
    businessType: l.businessType ?? "—",
    stage: l.stage ?? "—",
    status: l.status,
    date: format(l.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Consulting</h1>
        <p className="text-sm text-muted-foreground">
          B2B consulting services and lead pipeline
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
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
        <StatCard
          title="Qualified"
          value={qualifiedCount}
          subtitle="Ready for proposal"
          icon={TrendingUp}
        />
      </div>

      <ConsultingContent leads={rows} totalCount={leadCount} />
    </div>
  );
}
