import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { Mail, MailOpen, Inbox } from "lucide-react";
import { format } from "date-fns";
import { MessagesContent } from "./messages-content";

export default async function DashboardMessagesPage() {
  await requireRole(["ADMIN", "EDITOR"]);

  const [totalCount, unreadCount, recentMessages] = await Promise.all([
    db.contactMessage.count(),
    db.contactMessage.count({ where: { isRead: false } }),
    db.contactMessage.findMany({
      take: 30,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const rows = recentMessages.map((m) => ({
    id: m.id,
    fullName: m.fullName,
    email: m.email,
    phone: m.phone ?? "—",
    subject: m.subject ?? "—",
    message: m.message.length > 80 ? m.message.slice(0, 80) + "…" : m.message,
    isRead: m.isRead,
    date: format(m.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-sm text-muted-foreground">
          Contact form submissions
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Messages" value={totalCount} icon={Inbox} />
        <StatCard
          title="Unread"
          value={unreadCount}
          subtitle="Needs attention"
          icon={Mail}
        />
        <StatCard
          title="Read"
          value={totalCount - unreadCount}
          icon={MailOpen}
        />
      </div>

      <MessagesContent messages={rows} totalCount={totalCount} />
    </div>
  );
}
