// =============================================================================
// Server-side auth helpers — use in Server Components & Server Actions
// =============================================================================

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import type { UserRole } from "@/lib/user-role";

/** Get the current session (returns null if not authenticated) */
export async function getCurrentSession() {
  return getServerSession(authOptions);
}

/** Get the current user from the session (returns null if not authenticated) */
export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

/**
 * Require authentication — redirects to /login if not authenticated.
 * Use at the top of protected Server Components.
 */
export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session?.user) {
    redirect("/login");
  }
  return session.user;
}

/**
 * Require one of the specified roles — redirects to /dashboard if wrong role.
 * Use at the top of role-restricted Server Components.
 */
export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }
  return user;
}
