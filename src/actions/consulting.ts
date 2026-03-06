"use server";

import { db } from "@/lib/db";
import { consultingLeadSchema, type ConsultingLeadInput } from "@/lib/validations";
import { sendEmail, buildAdminNotificationEmail, buildConsultingConfirmationEmail } from "@/lib/email";
import type { ActionResult } from "@/lib/types/actions";

export async function submitConsultingLead(data: ConsultingLeadInput): Promise<ActionResult> {
  const parsed = consultingLeadSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { success: false, error: firstError || "Please check your form and try again." };
  }

  const d = parsed.data;

  try {
    await db.consultingLead.create({
      data: {
        businessName: d.businessName,
        contactName: d.contactName,
        email: d.email,
        phone: d.phone || null,
        businessType: d.businessType || null,
        businessSize: d.businessSize || null,
        location: d.location || null,
        website: d.website || null,
        serviceType: d.serviceType,
        services: d.services ? JSON.stringify(d.services) : null,
        stage: d.stage || null,
        message: d.message || null,
        budget: d.budget || null,
        timeline: d.timeline || null,
        leadSource: d.leadSource || "website",
      },
    });

    // Confirm to user (non-blocking)
    const confirmEmail = buildConsultingConfirmationEmail({
      contactName: d.contactName,
      businessName: d.businessName,
      serviceType: d.serviceType,
    });
    await sendEmail({ ...confirmEmail, to: d.email }).catch((e) =>
      console.error("Confirmation email failed:", e)
    );

    // Notify admin (non-blocking)
    await sendEmail(
      buildAdminNotificationEmail({
        type: "Consulting Lead",
        name: `${d.contactName} (${d.businessName})`,
        email: d.email,
        details: [
          `Service: ${d.serviceType}`,
          d.businessType ? `Business Type: ${d.businessType}` : null,
          d.businessSize ? `Size: ${d.businessSize}` : null,
          d.stage ? `Stage: ${d.stage}` : null,
          d.budget ? `Budget: ${d.budget}` : null,
          d.timeline ? `Timeline: ${d.timeline}` : null,
          d.message ? `\nMessage: ${d.message}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      })
    ).catch((e) => console.error("Admin notification failed:", e));

    return { success: true };
  } catch (error) {
    console.error("Consulting lead error:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again." };
  }
}
