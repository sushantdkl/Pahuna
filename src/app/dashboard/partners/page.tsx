import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { Handshake, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { PartnersContent } from "./partners-content";

export default async function DashboardPartnersPage() {
  await requireRole(["ADMIN"]);

  const [totalCount, pendingCount, approvedCount, rejectedCount, recentApplications] =
    await Promise.all([
      db.partnerApplication.count(),
      db.partnerApplication.count({ where: { status: "PENDING" } }),
      db.partnerApplication.count({ where: { status: "APPROVED" } }),
      db.partnerApplication.count({ where: { status: "REJECTED" } }),
      db.partnerApplication.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const rows = recentApplications.map((a) => ({
    id: a.id,
    businessName: a.businessName,
    ownerName: a.ownerName,
    email: a.email,
    phone: a.phone ?? "—",
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

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={totalCount}
          icon={Handshake}
        />
        <StatCard
          title="Pending Review"
          value={pendingCount}
          subtitle="Needs action"
          icon={Clock}
        />
        <StatCard
          title="Approved"
          value={approvedCount}
          icon={CheckCircle}
        />
        <StatCard
          title="Rejected"
          value={rejectedCount}
          icon={XCircle}
        />
      </div>

      <PartnersContent applications={rows} totalCount={totalCount} />
    </div>
  );
}
