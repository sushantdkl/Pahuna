"use server";

import { db } from "@/lib/db";
import { callbackSchema, type CallbackInput } from "@/lib/validations";
import {
  sendEmail,
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

    // Send confirmation if email was provided (non-blocking)
    if (d.email) {
      const confirmEmail = buildCallbackConfirmationEmail({
        fullName: d.fullName,
        phone: d.phone,
        preferredTime: d.preferredTime,
      });
      await sendEmail({ ...confirmEmail, to: d.email }).catch((e) =>
        console.error("Confirmation email failed:", e)
      );
    }

    // Notify admin (non-blocking)
    await sendEmail(
      buildAdminNotificationEmail({
        type: "Callback Request",
        name: d.fullName,
        email: d.email || "No email provided",
        details: `Phone: ${d.phone}\nPreferred Time: ${d.preferredTime || "ASAP"}\n${d.hotelName ? `Hotel: ${d.hotelName}` : ""}\n${d.message || ""}`,
      })
    ).catch((e) => console.error("Admin notification failed:", e));

    return { success: true };
  } catch (error) {
    console.error("Callback request error:", error);
    return { success: false, error: "Failed to submit callback request. Please try again." };
  }
}
