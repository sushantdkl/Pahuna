import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { GraduationCap, Users, BookOpen, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { TrainingContent } from "./training-content";

export default async function DashboardTrainingPage() {
  await requireRole(["ADMIN", "TRAINING_MANAGER"]);

  const [courseCount, enrollmentCount, pendingCount, confirmedCount, recentEnrollments] =
    await Promise.all([
      db.trainingCourse.count(),
      db.trainingEnrollment.count(),
      db.trainingEnrollment.count({ where: { status: "PENDING" } }),
      db.trainingEnrollment.count({ where: { status: "CONFIRMED" } }),
      db.trainingEnrollment.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
        include: { course: { select: { title: true } } },
      }),
    ]);

  const rows = recentEnrollments.map((e: any) => ({
    id: e.id,
    fullName: e.fullName,
    email: e.email,
    phone: e.phone ?? "—",
    course: e.course.title,
    status: e.status,
    date: format(e.createdAt, "MMM d, yyyy"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Training</h1>
        <p className="text-sm text-muted-foreground">
          Courses and student enrollments
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard title="Courses" value={courseCount} icon={BookOpen} />
        <StatCard
          title="Enrollments"
          value={enrollmentCount}
          icon={GraduationCap}
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          subtitle="Awaiting confirmation"
          icon={Users}
        />
        <StatCard
          title="Confirmed"
          value={confirmedCount}
          icon={CheckCircle}
        />
      </div>

      <TrainingContent enrollments={rows} totalCount={enrollmentCount} />
    </div>
  );
}
