"use server";

import { db } from "@/lib/db";
import { inquirySchema, type InquiryInput } from "@/lib/validations";
import {
  sendEmail,
  buildInquiryConfirmationEmail,
  buildAdminNotificationEmail,
} from "@/lib/email";
import type { ActionResult } from "@/lib/types/actions";

export async function submitInquiry(data: InquiryInput): Promise<ActionResult<{ inquiryId: string }>> {
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { success: false, error: firstError || "Please check your form and try again." };
  }

  const { fullName, email, phone, type, hotelId, hotelName, checkIn, checkOut, guests, rooms, message, source } = parsed.data;

  try {
    const inquiry = await db.inquiry.create({
      data: {
        type,
        fullName,
        email,
        phone: phone || null,
        hotelId: hotelId || null,
        checkIn: checkIn ? new Date(checkIn) : null,
        checkOut: checkOut ? new Date(checkOut) : null,
        guests: guests || null,
        rooms: rooms || null,
        message: message || null,
        source: source || "website",
      },
    });

    // Send confirmation email to user (non-blocking)
    const confirmationEmail = buildInquiryConfirmationEmail({
      fullName,
      hotelName,
      checkIn,
      checkOut,
    });
    await sendEmail({ ...confirmationEmail, to: email }).catch((e) =>
      console.error("Confirmation email failed:", e)
    );

    // Notify admin (non-blocking)
    await sendEmail(
      buildAdminNotificationEmail({
        type: type === "HOTEL_BOOKING" ? "Hotel Booking Inquiry" : "General Inquiry",
        name: fullName,
        email,
        details: [
          hotelName ? `Hotel: ${hotelName}` : null,
          checkIn && checkOut ? `Dates: ${checkIn} → ${checkOut}` : null,
          guests ? `Guests: ${guests}` : null,
          rooms ? `Rooms: ${rooms}` : null,
          message ? `Message: ${message}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      })
    ).catch((e) => console.error("Admin notification failed:", e));

    return { success: true, data: { inquiryId: inquiry.id } };
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again." };
  }
}
