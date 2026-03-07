import { requireAuth } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { ROLE_LABELS } from "@/lib/roles";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Hotel,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Handshake,
  FileText,
  Users,
  Mail,
  AlertCircle,
} from "lucide-react";
import { RecentLeadsTable } from "./recent-leads-table";

export default async function DashboardOverviewPage() {
  const user = await requireAuth();

  // Fetch overview stats in parallel — totals + action-needed counts
  const [
    hotelCount,
    inquiryCount,
    newInquiryCount,
    consultingLeadCount,
    newConsultingLeadCount,
    trainingEnrollmentCount,
    pendingEnrollmentCount,
    partnerApplicationCount,
    pendingPartnerCount,
    blogPostCount,
    contactMessageCount,
    unreadMessageCount,
    subscriberCount,
  ] = await Promise.all([
    db.hotel.count(),
    db.inquiry.count(),
    db.inquiry.count({ where: { status: "NEW" } }),
    db.consultingLead.count(),
    db.consultingLead.count({ where: { status: "NEW" } }),
    db.trainingEnrollment.count(),
    db.trainingEnrollment.count({ where: { status: "PENDING" } }),
    db.partnerApplication.count(),
    db.partnerApplication.count({ where: { status: "PENDING" } }),
    db.blogPost.count(),
    db.contactMessage.count(),
    db.contactMessage.count({ where: { isRead: false } }),
    db.newsletterSubscriber.count({ where: { isActive: true } }),
  ]);

  // Fetch recent items for the table
  const recentInquiries = await db.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fullName: true,
      email: true,
      type: true,
      status: true,
      createdAt: true,
    },
  });

  const recentConsultingLeads = await db.consultingLead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      contactName: true,
      businessName: true,
      email: true,
      serviceType: true,
      status: true,
      createdAt: true,
    },
  });

  const needsAttention =
    newInquiryCount +
    newConsultingLeadCount +
    pendingEnrollmentCount +
    pendingPartnerCount +
    unreadMessageCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, {user.name || user.email} · {ROLE_LABELS[user.role]}
          </p>
        </div>
        {needsAttention > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm dark:border-amber-800 dark:bg-amber-950">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span className="font-medium text-amber-800 dark:text-amber-200">
              {needsAttention} item{needsAttention > 1 ? "s" : ""} need attention
            </span>
          </div>
        )}
      </div>

      {/* Stat cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Hotel Inquiries"
          value={inquiryCount}
          subtitle={newInquiryCount > 0 ? `${newInquiryCount} new` : "All handled"}
          icon={MessageSquare}
        />
        <StatCard
          title="Consulting Leads"
          value={consultingLeadCount}
          subtitle={newConsultingLeadCount > 0 ? `${newConsultingLeadCount} new` : "All handled"}
          icon={Briefcase}
        />
        <StatCard
          title="Training Enrollments"
          value={trainingEnrollmentCount}
          subtitle={pendingEnrollmentCount > 0 ? `${pendingEnrollmentCount} pending` : "All confirmed"}
          icon={GraduationCap}
        />
        <StatCard
          title="Partner Applications"
          value={partnerApplicationCount}
          subtitle={pendingPartnerCount > 0 ? `${pendingPartnerCount} pending` : "All reviewed"}
          icon={Handshake}
        />
        <StatCard
          title="Hotels"
          value={hotelCount}
          subtitle="Listed properties"
          icon={Hotel}
        />
        <StatCard
          title="Messages"
          value={contactMessageCount}
          subtitle={unreadMessageCount > 0 ? `${unreadMessageCount} unread` : "All read"}
          icon={Mail}
        />
        <StatCard
          title="Blog Posts"
          value={blogPostCount}
          subtitle="Published articles"
          icon={FileText}
        />
        <StatCard
          title="Newsletter"
          value={subscriberCount}
          subtitle="Active subscribers"
          icon={Users}
        />
      </div>

      {/* Recent tables */}
      <RecentLeadsTable
        inquiries={recentInquiries}
        consultingLeads={recentConsultingLeads}
      />
    </div>
  );
}
