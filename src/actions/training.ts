"use server";

import { db } from "@/lib/db";
import {
  trainingEnrollmentSchema,
  type TrainingEnrollmentInput,
} from "@/lib/validations";
import {
  sendEmail,
  buildAdminNotificationEmail,
  buildTrainingConfirmationEmail,
} from "@/lib/email";
import type { ActionResult } from "@/lib/types/actions";

export async function submitTrainingEnrollment(data: TrainingEnrollmentInput): Promise<ActionResult> {
  const parsed = trainingEnrollmentSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { success: false, error: firstError || "Please check your form and try again." };
  }

  const d = parsed.data;

  try {
    await db.trainingEnrollment.create({
      data: {
        fullName: d.fullName,
        email: d.email,
        phone: d.phone,
        age: d.age || null,
        education: d.education || null,
        courseId: d.courseId,
        experience: d.experience || null,
        motivation: d.motivation || null,
      },
    });

    // Confirm to user (non-blocking)
    const confirmationEmail = buildTrainingConfirmationEmail({
      studentName: d.fullName,
      courseName: d.courseId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    });
    await sendEmail({ ...confirmationEmail, to: d.email }).catch((e) =>
      console.error("Confirmation email failed:", e)
    );

    // Notify admin (non-blocking)
    const details = [
      `Phone: ${d.phone}`,
      `Course: ${d.courseId}`,
      d.age ? `Age: ${d.age}` : null,
      d.education ? `Education: ${d.education}` : null,
      d.experience ? `Experience: ${d.experience}` : null,
      d.motivation ? `Motivation: ${d.motivation}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    await sendEmail(
      buildAdminNotificationEmail({
        type: "Training Enrollment",
        name: d.fullName,
        email: d.email,
        details,
      })
    ).catch((e) => console.error("Admin notification failed:", e));

    return { success: true };
  } catch (error) {
    console.error("Training enrollment error:", error);
    return { success: false, error: "Failed to submit enrollment. Please try again." };
  }
}
