import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { MessageSquare, Briefcase, Phone, AlertCircle } from "lucide-react";
import { LeadsContent } from "./leads-content";
import { format } from "date-fns";

export default async function DashboardLeadsPage() {
  await requireRole(["ADMIN", "HOTEL_PARTNER", "CONSULTING_MANAGER"]);

  const [
    inquiryCount,
    newInquiryCount,
    callbackCount,
    consultingLeadCount,
    newConsultingLeadCount,
    recentInquiries,
    recentLeads,
  ] = await Promise.all([
    db.inquiry.count({ where: { type: { not: "CALLBACK_REQUEST" } } }),
    db.inquiry.count({ where: { status: "NEW", type: { not: "CALLBACK_REQUEST" } } }),
    db.inquiry.count({ where: { type: "CALLBACK_REQUEST" } }),
    db.consultingLead.count(),
    db.consultingLead.count({ where: { status: "NEW" } }),
    db.inquiry.findMany({
      take: 25,
      orderBy: { createdAt: "desc" },
      include: { hotel: { select: { name: true } } },
    }),
    db.consultingLead.findMany({
      take: 25,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const inquiryRows = recentInquiries.map((i) => ({
    id: i.id,
    fullName: i.fullName,
    email: i.email,
    phone: i.phone ?? "—",
    hotel: i.hotel?.name ?? "General",
    type: i.type,
    status: i.status,
    date: format(i.createdAt, "MMM d, yyyy"),
  }));

  const leadRows = recentLeads.map((l) => ({
    id: l.id,
    contactName: l.contactName,
    businessName: l.businessName,
    email: l.email,
    phone: l.phone ?? "—",
    service: l.serviceType,
    status: l.status,
    date: format(l.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leads & Inquiries</h1>
        <p className="text-sm text-muted-foreground">
          Hotel inquiries, callback requests, and consulting leads
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Hotel Inquiries"
          value={inquiryCount}
          subtitle={newInquiryCount > 0 ? `${newInquiryCount} new` : "All handled"}
          icon={MessageSquare}
        />
        <StatCard
          title="Callback Requests"
          value={callbackCount}
          subtitle="Awaiting calls"
          icon={Phone}
        />
        <StatCard
          title="Consulting Leads"
          value={consultingLeadCount}
          subtitle={newConsultingLeadCount > 0 ? `${newConsultingLeadCount} new` : "All handled"}
          icon={Briefcase}
        />
        <StatCard
          title="Needs Attention"
          value={newInquiryCount + newConsultingLeadCount}
          subtitle="New & uncontacted"
          icon={AlertCircle}
        />
      </div>

      <LeadsContent
        inquiries={inquiryRows}
        consultingLeads={leadRows}
        totalInquiries={inquiryCount + callbackCount}
        totalLeads={consultingLeadCount}
      />
    </div>
  );
}
