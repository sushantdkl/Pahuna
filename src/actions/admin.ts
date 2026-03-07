"use server";

import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth-helpers";
import type { ActionResult } from "@/lib/types/actions";

// ── Inquiry status ──────────────────────────────────────────────────────────

export async function updateInquiryStatus(
  id: string,
  status: string,
): Promise<ActionResult> {
  await requireRole(["ADMIN", "HOTEL_PARTNER", "CONSULTING_MANAGER"]);
  const valid = ["NEW", "CONTACTED", "IN_PROGRESS", "CONVERTED", "CLOSED"] as const;
  if (!valid.includes(status as (typeof valid)[number])) {
    return { success: false, error: "Invalid status." };
  }
  try {
    await db.inquiry.update({ where: { id }, data: { status: status as (typeof valid)[number] } });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update inquiry status." };
  }
}

// ── Consulting lead status ──────────────────────────────────────────────────

export async function updateConsultingLeadStatus(
  id: string,
  status: string,
): Promise<ActionResult> {
  await requireRole(["ADMIN", "CONSULTING_MANAGER"]);
  const valid = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"];
  if (!valid.includes(status)) {
    return { success: false, error: "Invalid status." };
  }
  try {
    await db.consultingLead.update({ where: { id }, data: { status } });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update consulting lead status." };
  }
}

// ── Partner application status ──────────────────────────────────────────────

export async function updatePartnerStatus(
  id: string,
  status: string,
): Promise<ActionResult> {
  await requireRole(["ADMIN"]);
  const valid = ["PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"] as const;
  if (!valid.includes(status as (typeof valid)[number])) {
    return { success: false, error: "Invalid status." };
  }
  try {
    await db.partnerApplication.update({
      where: { id },
      data: {
        status: status as (typeof valid)[number],
        reviewedAt: status !== "PENDING" ? new Date() : undefined,
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update partner status." };
  }
}

// ── Training enrollment status ──────────────────────────────────────────────

export async function updateEnrollmentStatus(
  id: string,
  status: string,
): Promise<ActionResult> {
  await requireRole(["ADMIN", "TRAINING_MANAGER"]);
  const valid = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
  if (!valid.includes(status)) {
    return { success: false, error: "Invalid status." };
  }
  try {
    await db.trainingEnrollment.update({ where: { id }, data: { status } });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update enrollment status." };
  }
}

// ── Contact message read status ─────────────────────────────────────────────

export async function markMessageRead(
  id: string,
  isRead: boolean,
): Promise<ActionResult> {
  await requireRole(["ADMIN", "EDITOR"]);
  try {
    await db.contactMessage.update({ where: { id }, data: { isRead } });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update message." };
  }
}
