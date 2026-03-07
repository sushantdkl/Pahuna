// =============================================================================
// Email service — Resend-backed transactional email layer
// Provides: sendEmail, sendEmails, 7 template builders
// Swap provider: replace the `deliverEmail` function only
// =============================================================================

import { Resend } from "resend";

// ── Config ──────────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "Pahuna <noreply@pahuna.com>";
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO ?? "hello@pahuna.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hello@pahuna.com";

/** Lazily initialized Resend client — only created when an API key exists */
let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(RESEND_API_KEY);
  }
  return resendClient;
}

// ── Types ───────────────────────────────────────────────────────────────────

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
  metadata?: Record<string, string>;
}

export interface EmailResult {
  success: boolean;
  /** Resend message ID on success */
  messageId?: string;
  error?: string;
}

// ── Core send function ──────────────────────────────────────────────────────

/**
 * Send a transactional email via Resend.
 * Falls back to console logging when no API key is configured (dev/CI).
 * Never throws — always returns a structured result.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  try {
    const resend = getResend();

    if (!resend) {
      // Dev / CI fallback — log instead of sending
      console.log("[email:dev]", {
        to: payload.to,
        subject: payload.subject,
        bodyLength: payload.body.length,
      });
      return { success: true, messageId: "dev-mode" };
    }

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: payload.to,
      subject: payload.subject,
      text: payload.body,
      replyTo: payload.replyTo ?? EMAIL_REPLY_TO,
      tags: payload.metadata
        ? Object.entries(payload.metadata).map(([name, value]) => ({
            name,
            value,
          }))
        : undefined,
    });

    if (error) {
      console.error("[email:error]", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email:error]", message);
    return { success: false, error: message };
  }
}

/**
 * Send user acknowledgment + admin notification in parallel.
 * Both are fire-and-forget — failures are logged but never bubble up.
 */
export async function sendEmails(
  userEmail: EmailPayload,
  adminDetails: {
    type: string;
    name: string;
    email: string;
    details: string;
  },
): Promise<void> {
  const adminEmail = buildAdminNotificationEmail(adminDetails);

  await Promise.allSettled([
    sendEmail(userEmail),
    sendEmail(adminEmail),
  ]);
}

// ── Pre-built email templates ──

export function buildInquiryConfirmationEmail(data: {
  fullName: string;
  hotelName?: string;
  checkIn?: string;
  checkOut?: string;
}): EmailPayload {
  const isHotel = !!data.hotelName;
  return {
    to: "", // Filled by caller
    subject: isHotel
      ? `Booking Inquiry for ${data.hotelName} — Pahuna`
      : "We Received Your Inquiry — Pahuna",
    body: `
Hi ${data.fullName},

Thank you for your inquiry${isHotel ? ` about ${data.hotelName}` : ""}.
${
  data.checkIn && data.checkOut
    ? `\nRequested dates: ${data.checkIn} to ${data.checkOut}`
    : ""
}

Our team will review your request and get back to you within 2-4 hours during business hours.

If you need immediate assistance, call us at +977-083-520000.

Best regards,
Pahuna Team
    `.trim(),
  };
}

export function buildCallbackConfirmationEmail(data: {
  fullName: string;
  phone: string;
  preferredTime?: string;
}): EmailPayload {
  return {
    to: "", // Filled by caller
    subject: "Callback Request Received — Pahuna",
    body: `
Hi ${data.fullName},

We've received your callback request. Our team will call you at ${data.phone}${
      data.preferredTime ? ` around ${data.preferredTime}` : " as soon as possible"
    }.

If you need immediate help, call us directly at +977-083-520000.

Best regards,
Pahuna Team
    `.trim(),
  };
}

export function buildPartnerConfirmationEmail(data: {
  ownerName: string;
  businessName: string;
}): EmailPayload {
  return {
    to: "",
    subject: "Partner Application Received — Pahuna",
    body: `
Hi ${data.ownerName},

Thank you for applying to partner ${data.businessName} with Pahuna.

We'll review your application and respond within 48 hours. In the meantime, feel free to reach out with any questions.

Best regards,
Pahuna Team
    `.trim(),
  };
}

export function buildHotelLeadConfirmationEmail(data: {
  ownerName: string;
  hotelName: string;
}): EmailPayload {
  return {
    to: "",
    subject: `We'd Love to List ${data.hotelName} — Pahuna`,
    body: `
Hi ${data.ownerName},

Thank you for expressing interest in listing ${data.hotelName} on our platform.

Our partnerships team will contact you within 24 hours to discuss listing details, verification, and how we can help boost your bookings.

Best regards,
Pahuna Partnerships Team
    `.trim(),
  };
}

export function buildConsultingConfirmationEmail(data: {
  contactName: string;
  businessName: string;
  serviceType: string;
}): EmailPayload {
  return {
    to: "",
    subject: `Consulting Request Received — ${data.serviceType}`,
    body: `
Hi ${data.contactName},

Thank you for reaching out about ${data.serviceType} consulting for ${data.businessName}.

Here's what happens next:

1. Our consulting team will review your requirements within 24 hours.
2. We'll schedule a free discovery call to understand your needs.
3. You'll receive a tailored proposal with scope, timeline, and pricing.

If you need to speak with us sooner, call +977-083-520000.

Best regards,
Pahuna Consulting Team
    `.trim(),
  };
}

export function buildTrainingConfirmationEmail(data: {
  studentName: string;
  courseName: string;
}): EmailPayload {
  return {
    to: "",
    subject: "Training Enrollment Received — Pahuna Academy",
    body: `
Hi ${data.studentName},

Thank you for enrolling in ${data.courseName} at Pahuna Training Academy!

Here's what happens next:

1. Our admissions team will review your application within 24 hours.
2. You'll receive a call to confirm your batch, schedule, and payment details.
3. Once confirmed, you'll get a welcome kit with course materials and prep instructions.

Payment Options:
- Full payment upfront (recommended)
- 2-installment plan: 60% at enrollment, 40% by the start of week 2

Important: Seats are limited and allocated on a first-come, first-served basis.

If you have questions, call us at +977-083-520000 or reply to this email.

Best regards,
Pahuna Training Academy
    `.trim(),
  };
}

export function buildContactConfirmationEmail(data: {
  fullName: string;
  email: string;
  subject?: string;
}): EmailPayload {
  return {
    to: data.email,
    subject: "Message Received — Pahuna",
    body: `
Hi ${data.fullName},

Thank you for reaching out${data.subject ? ` about "${data.subject}"` : ""}. We've received your message and will respond within 24 hours.

If you need immediate assistance, call us at +977-083-520000.

Best regards,
Pahuna Team — Surkhet, Nepal
    `.trim(),
  };
}

export function buildAdminNotificationEmail(data: {
  type: string;
  name: string;
  email: string;
  details: string;
}): EmailPayload {
  return {
    to: ADMIN_EMAIL,
    subject: `New ${data.type}: ${data.name}`,
    replyTo: data.email,
    body: `
New ${data.type} received:

Name: ${data.name}
Email: ${data.email}

${data.details}

— Automated notification from pahuna.com
    `.trim(),
  };
}
