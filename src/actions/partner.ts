"use server";

import { db } from "@/lib/db";
import { partnerSchema, type PartnerInput } from "@/lib/validations";
import {
  sendEmails,
  buildPartnerConfirmationEmail,
} from "@/lib/email";
import type { ActionResult } from "@/lib/types/actions";

export async function submitPartnerApplication(data: PartnerInput): Promise<ActionResult> {
  const parsed = partnerSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { success: false, error: firstError || "Please check your form and try again." };
  }

  const d = parsed.data;

  try {
    await db.partnerApplication.create({
      data: {
        businessName: d.businessName,
        partnerType: d.partnerType,
        ownerName: d.ownerName,
        email: d.email,
        phone: d.phone,
        address: d.address || null,
        website: d.website || null,
        totalRooms: d.totalRooms || null,
        currentRevenue: d.currentRevenue || null,
        existingOnline: d.existingOnline,
        challenges: d.challenges || null,
        goals: d.goals || null,
      },
    });

    // Send user confirmation + admin notification (non-blocking)
    const confirmEmail = buildPartnerConfirmationEmail({
      ownerName: d.ownerName,
      businessName: d.businessName,
    });
    sendEmails(
      { ...confirmEmail, to: d.email },
      {
        type: "Partner Application",
        name: `${d.ownerName} (${d.businessName})`,
        email: d.email,
        details: `Type: ${d.partnerType}\nPhone: ${d.phone}\nRooms: ${d.totalRooms || "N/A"}\nWebsite: ${d.website || "None"}`,
      },
    );

    return { success: true };
  } catch (error) {
    console.error("Partner application error:", error);
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}
