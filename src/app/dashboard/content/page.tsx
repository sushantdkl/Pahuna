import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { FileText, Eye, Pencil } from "lucide-react";

export default async function DashboardContentPage() {
  await requireRole(["ADMIN", "EDITOR"]);

  const [totalPosts, publishedPosts, draftPosts] = await Promise.all([
    db.blogPost.count(),
    db.blogPost.count({ where: { isPublished: true } }),
    db.blogPost.count({ where: { isPublished: false } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content</h1>
        <p className="text-sm text-muted-foreground">
          Blog posts, destinations, and editorial content
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Posts" value={totalPosts} icon={FileText} />
        <StatCard title="Published" value={publishedPosts} icon={Eye} />
        <StatCard title="Drafts" value={draftPosts} icon={Pencil} />
      </div>

      <div className="rounded-lg border bg-background p-8 text-center">
        <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
        <h3 className="mt-3 font-medium">Content management coming soon</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Blog post editor, destination management, and media library will be
          built in the next phase.
        </p>
      </div>
    </div>
  );
}
