import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  DataTableCard,
  StatusBadge,
} from "@/components/dashboard/data-table-card";
import { GraduationCap, Users, BookOpen } from "lucide-react";
import { format } from "date-fns";

export default async function DashboardTrainingPage() {
  await requireRole(["ADMIN", "TRAINING_MANAGER"]);

  const [courseCount, enrollmentCount, pendingCount, recentEnrollments] =
    await Promise.all([
      db.trainingCourse.count(),
      db.trainingEnrollment.count(),
      db.trainingEnrollment.count({ where: { status: "PENDING" } }),
      db.trainingEnrollment.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { course: { select: { title: true } } },
      }),
    ]);

  const rows = recentEnrollments.map((e) => ({
    id: e.id,
    fullName: e.fullName,
    email: e.email,
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

      <div className="grid gap-4 sm:grid-cols-3">
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
      </div>

      <DataTableCard
        title="Recent Enrollments"
        description="Latest student enrollment applications"
        data={rows}
        emptyMessage="No enrollments yet"
        columns={[
          { header: "Student", accessorKey: "fullName" },
          { header: "Email", accessorKey: "email", className: "hidden md:table-cell" },
          { header: "Course", accessorKey: "course" },
          {
            header: "Status",
            accessorKey: "status",
            cell: (val) => <StatusBadge status={String(val)} />,
          },
          { header: "Date", accessorKey: "date", className: "hidden sm:table-cell" },
        ]}
      />
    </div>
  );
}
