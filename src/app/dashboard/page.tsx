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
} from "lucide-react";
import { RecentLeadsTable } from "./recent-leads-table";

export default async function DashboardOverviewPage() {
  const user = await requireAuth();

  // Fetch overview stats in parallel
  const [
    hotelCount,
    inquiryCount,
    consultingLeadCount,
    trainingEnrollmentCount,
    partnerApplicationCount,
    blogPostCount,
    contactMessageCount,
    subscriberCount,
  ] = await Promise.all([
    db.hotel.count(),
    db.inquiry.count(),
    db.consultingLead.count(),
    db.trainingEnrollment.count(),
    db.partnerApplication.count(),
    db.blogPost.count(),
    db.contactMessage.count(),
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user.name || user.email} · {ROLE_LABELS[user.role]}
        </p>
      </div>

      {/* Stat cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Hotels"
          value={hotelCount}
          subtitle="Listed properties"
          icon={Hotel}
        />
        <StatCard
          title="Hotel Inquiries"
          value={inquiryCount}
          subtitle="Total inquiries"
          icon={MessageSquare}
        />
        <StatCard
          title="Consulting Leads"
          value={consultingLeadCount}
          subtitle="B2B leads"
          icon={Briefcase}
        />
        <StatCard
          title="Training Enrollments"
          value={trainingEnrollmentCount}
          subtitle="Student enrollments"
          icon={GraduationCap}
        />
        <StatCard
          title="Partner Applications"
          value={partnerApplicationCount}
          subtitle="Partnership requests"
          icon={Handshake}
        />
        <StatCard
          title="Blog Posts"
          value={blogPostCount}
          subtitle="Published articles"
          icon={FileText}
        />
        <StatCard
          title="Messages"
          value={contactMessageCount}
          subtitle="Contact form messages"
          icon={Mail}
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
