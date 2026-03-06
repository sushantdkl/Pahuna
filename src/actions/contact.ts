"use server";

import { db } from "@/lib/db";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { sendEmail, buildAdminNotificationEmail } from "@/lib/email";
import type { ActionResult } from "@/lib/types/actions";

export async function submitContact(data: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { success: false, error: firstError || "Please check your form and try again." };
  }

  const { fullName, email, phone, subject, message } = parsed.data;

  try {
    await db.contactMessage.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      },
    });

    // Confirm to user (non-blocking — DB write already succeeded)
    await sendEmail({
      to: email,
      subject: "Message Received — Pahuna",
      body: `Hi ${fullName},\n\nThank you for reaching out about "${subject}". We've received your message and will respond within 24 hours.\n\nBest regards,\nPahuna Team`,
    }).catch((e) => console.error("Confirmation email failed:", e));

    // Notify admin (non-blocking)
    await sendEmail(
      buildAdminNotificationEmail({
        type: "Contact Message",
        name: fullName,
        email,
        details: `Subject: ${subject}\n\n${message}`,
      })
    ).catch((e) => console.error("Admin notification failed:", e));

    return { success: true };
  } catch (error) {
    console.error("Contact submission error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
