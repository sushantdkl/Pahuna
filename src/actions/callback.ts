"use server";

import { db } from "@/lib/db";
import { callbackSchema, type CallbackInput } from "@/lib/validations";
import {
  sendEmail,
  sendEmails,
  buildCallbackConfirmationEmail,
  buildAdminNotificationEmail,
} from "@/lib/email";
import type { ActionResult } from "@/lib/types/actions";

export async function submitCallbackRequest(data: CallbackInput): Promise<ActionResult> {
  const parsed = callbackSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { success: false, error: firstError || "Please check your form and try again." };
  }

  const d = parsed.data;

  try {
    // Store as an Inquiry with type CALLBACK_REQUEST
    await db.inquiry.create({
      data: {
        type: "CALLBACK_REQUEST",
        fullName: d.fullName,
        email: d.email || "",
        phone: d.phone,
        hotelId: d.hotelId || null,
        message: [
          d.message,
          d.preferredTime ? `Preferred callback time: ${d.preferredTime}` : null,
          d.hotelName ? `Regarding: ${d.hotelName}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        source: d.source || "website",
      },
    });

    // Send confirmation + admin notification (non-blocking)
    if (d.email) {
      const confirmEmail = buildCallbackConfirmationEmail({
        fullName: d.fullName,
        phone: d.phone,
        preferredTime: d.preferredTime,
      });
      sendEmails(
        { ...confirmEmail, to: d.email },
        {
          type: "Callback Request",
          name: d.fullName,
          email: d.email,
          details: `Phone: ${d.phone}\nPreferred Time: ${d.preferredTime || "ASAP"}\n${d.hotelName ? `Hotel: ${d.hotelName}` : ""}\n${d.message || ""}`,
        },
      );
    } else {
      // No user email — send admin notification only
      sendEmail(
        buildAdminNotificationEmail({
          type: "Callback Request",
          name: d.fullName,
          email: "No email provided",
          details: `Phone: ${d.phone}\nPreferred Time: ${d.preferredTime || "ASAP"}\n${d.hotelName ? `Hotel: ${d.hotelName}` : ""}\n${d.message || ""}`,
        }),
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Callback request error:", error);
    return { success: false, error: "Failed to submit callback request. Please try again." };
  }
}
