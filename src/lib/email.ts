// =============================================================================
// Email service hooks — confirmation-ready email layer
// Phase 1: logs emails & returns structured payloads
// Phase 2: integrate with Resend, SendGrid, or Nodemailer
// =============================================================================

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
  metadata?: Record<string, string>;
}

/**
 * Send a transactional email. Currently logs to console.
 * Replace with Resend / SendGrid / AWS SES in production.
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean }> {
  try {
    // Phase 2: replace with actual provider
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: "noreply@surkhethotel.com", ...payload });

    console.log("📧 Email queued:", {
      to: payload.to,
      subject: payload.subject,
      bodyLength: payload.body.length,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false };
  }
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

export function buildAdminNotificationEmail(data: {
  type: string;
  name: string;
  email: string;
  details: string;
}): EmailPayload {
  return {
    to: "hello@surkhethotel.com",
    subject: `New ${data.type}: ${data.name}`,
    replyTo: data.email,
    body: `
New ${data.type} received:

Name: ${data.name}
Email: ${data.email}

${data.details}

— Automated notification from surkhethotel.com
    `.trim(),
  };
}
