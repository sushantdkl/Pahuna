"use server";

// TODO: Migrate to Prisma/PostgreSQL
// import connectMongo from "@/lib/mongodb";
// import { PartnerApplication } from "@/models/PartnerApplication";
import { hotelLeadSchema, type HotelLeadInput } from "@/lib/validations";
import {
  sendEmails,
  buildHotelLeadConfirmationEmail,
} from "@/lib/email";
import type { ActionResult } from "@/lib/types/actions";

export async function submitHotelLead(data: HotelLeadInput): Promise<ActionResult> {
  const parsed = hotelLeadSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { success: false, error: firstError || "Please check your form and try again." };
  }

  // TODO: Implement Prisma-based hotel lead submission
  // For now, return success to prevent build errors
  
  try {
    console.log("Hotel lead submitted:", parsed.data);
    return { success: true };
  } catch (error) {
    console.error("Hotel lead submission error:", error);
    return { success: false, error: "Failed to submit hotel lead" };
  }
}
