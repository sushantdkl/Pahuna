import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-helpers";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
