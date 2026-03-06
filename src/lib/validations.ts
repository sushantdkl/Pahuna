import { z } from "zod";

// =============================================================================
// Zod validation schemas for all forms
// =============================================================================

// ── Inquiry (hotel booking / general) ──
export const inquirySchema = z.object({
  type: z.enum(["HOTEL_BOOKING", "GENERAL", "CALLBACK_REQUEST", "CUSTOM_TRIP"]),
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  hotelId: z.string().optional(),
  hotelName: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().min(1).max(20).optional(),
  rooms: z.number().min(1).max(10).optional(),
  message: z.string().max(2000, "Message is too long").optional(),
  source: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

// ── Callback Request ──
export const callbackSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  preferredTime: z.string().optional(),
  hotelId: z.string().optional(),
  hotelName: z.string().optional(),
  message: z.string().max(500, "Message is too long").optional(),
  source: z.string().optional(),
});

export type CallbackInput = z.infer<typeof callbackSchema>;

// ── Hotel Partner Lead Capture ──
export const hotelLeadSchema = z.object({
  hotelName: z.string().min(2, "Hotel name is required"),
  ownerName: z.string().min(2, "Owner/manager name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  propertyType: z.enum([
    "HOTEL",
    "RESORT",
    "GUESTHOUSE",
    "HOMESTAY",
    "LODGE",
    "HOSTEL",
    "APARTMENT",
    "BOUTIQUE",
  ]),
  totalRooms: z.number().min(1, "Must have at least 1 room").max(500).optional(),
  location: z.string().min(2, "Location is required"),
  currentOnline: z.boolean().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  priceRange: z.string().optional(),
  challenges: z.string().max(2000).optional(),
  goals: z.string().max(2000).optional(),
});

export type HotelLeadInput = z.infer<typeof hotelLeadSchema>;

// ── Contact ──
export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ── Partner Application ──
export const partnerSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  partnerType: z.enum([
    "HOTEL",
    "RESORT",
    "RESTAURANT",
    "TRAVEL_AGENCY",
    "TRANSPORT",
    "OTHER",
  ]),
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  address: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  totalRooms: z.number().optional(),
  currentRevenue: z.string().optional(),
  existingOnline: z.boolean().optional(),
  challenges: z.string().optional(),
  goals: z.string().optional(),
});

export type PartnerInput = z.infer<typeof partnerSchema>;

// ── Training Enrollment ──
export const trainingEnrollmentSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  age: z.number().min(16).max(65).optional(),
  education: z.string().optional(),
  courseId: z.string().min(1, "Please select a course"),
  experience: z.string().optional(),
  motivation: z.string().optional(),
});

export type TrainingEnrollmentInput = z.infer<typeof trainingEnrollmentSchema>;

// ── Consulting Lead ──
export const consultingLeadSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  businessType: z.string().optional(),
  businessSize: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  serviceType: z.string().min(1, "Please select a primary service"),
  services: z.array(z.string()).optional(),
  stage: z.string().optional(),
  message: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  leadSource: z.string().optional(),
});

export type ConsultingLeadInput = z.infer<typeof consultingLeadSchema>;

// ── Newsletter ──
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  name: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// =============================================================================
// Hotel filter types (client-side, not a Zod schema)
// =============================================================================

export interface HotelFilters {
  search: string;
  propertyType: string | null;
  priceRange: string | null;
  starRating: number | null;
  amenities: string[];
  location: string;
  sortBy: "featured" | "price-low" | "price-high" | "rating";
}
