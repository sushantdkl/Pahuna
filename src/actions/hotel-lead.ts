"use server";

import { db } from "@/lib/db";
import { hotelLeadSchema, type HotelLeadInput } from "@/lib/validations";
import {
  sendEmail,
  buildHotelLeadConfirmationEmail,
  buildAdminNotificationEmail,
} from "@/lib/email";
import type { ActionResult } from "@/lib/types/actions";

export async function submitHotelLead(data: HotelLeadInput): Promise<ActionResult> {
  const parsed = hotelLeadSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { success: false, error: firstError || "Please check your form and try again." };
  }

  const d = parsed.data;

  try {
    // Store as a PartnerApplication with type HOTEL
    await db.partnerApplication.create({
      data: {
        businessName: d.hotelName,
        partnerType: "HOTEL",
        ownerName: d.ownerName,
        email: d.email,
        phone: d.phone,
        address: d.location,
        website: d.website || null,
        totalRooms: d.totalRooms || null,
        existingOnline: d.currentOnline,
        challenges: d.challenges || null,
        goals: [
          d.goals,
          d.priceRange ? `Price range: ${d.priceRange}` : null,
          `Property type: ${d.propertyType}`,
        ]
          .filter(Boolean)
          .join("\n"),
      },
    });

    // Send confirmation (non-blocking)
    const confirmEmail = buildHotelLeadConfirmationEmail({
      ownerName: d.ownerName,
      hotelName: d.hotelName,
    });
    await sendEmail({ ...confirmEmail, to: d.email }).catch((e) =>
      console.error("Confirmation email failed:", e)
    );

    // Notify admin (non-blocking)
    await sendEmail(
      buildAdminNotificationEmail({
        type: "Hotel Lead",
        name: `${d.ownerName} (${d.hotelName})`,
        email: d.email,
        details: `Type: ${d.propertyType}\nLocation: ${d.location}\nRooms: ${d.totalRooms || "N/A"}\nOnline: ${d.currentOnline ? "Yes" : "No"}\nPrice Range: ${d.priceRange || "N/A"}\n\nChallenges: ${d.challenges || "None"}\nGoals: ${d.goals || "None"}`,
      })
    ).catch((e) => console.error("Admin notification failed:", e));

    return { success: true };
  } catch (error) {
    console.error("Hotel lead error:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }
}
