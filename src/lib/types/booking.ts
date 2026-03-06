/**
 * Phase 2 Extensibility Types
 * ────────────────────────────
 * These interfaces define the data shapes for features planned beyond
 * the initial inquiry-first layer: room inventory, availability calendar,
 * payment processing, booking confirmation, and commission tracking.
 *
 * IMPORTANT: These are TYPE-ONLY definitions. No runtime code is generated.
 * They serve as the contract for Phase 2 development.
 */

// ── Room Inventory ──

export interface RoomType {
  id: string;
  hotelId: string;
  name: string; // e.g. "Deluxe Double", "Standard Twin"
  description: string;
  maxOccupancy: number;
  bedType: BedType;
  totalRooms: number;
  basePrice: number; // NPR per night
  amenities: string[];
  images: string[];
  isActive: boolean;
}

export type BedType = "SINGLE" | "DOUBLE" | "TWIN" | "QUEEN" | "KING" | "BUNK";

// ── Availability ──

export interface RoomAvailability {
  id: string;
  roomTypeId: string;
  date: string; // ISO date string YYYY-MM-DD
  availableRooms: number;
  price: number; // Override price for this date (seasonal pricing)
  minimumStay: number;
  isBlocked: boolean; // Hotel manually blocked
}

export interface AvailabilityQuery {
  hotelId: string;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  guests: number;
  rooms: number;
}

export interface AvailabilityResult {
  available: boolean;
  roomTypes: Array<{
    roomType: RoomType;
    availableRooms: number;
    pricePerNight: number;
    totalPrice: number;
    nights: number;
  }>;
}

// ── Booking ──

export type BookingStatus =
  | "PENDING" // Inquiry submitted
  | "CONFIRMED" // Hotel confirmed availability
  | "PAYMENT_PENDING" // Awaiting payment
  | "PAID" // Payment received
  | "CHECKED_IN" // Guest arrived
  | "COMPLETED" // Stay completed
  | "CANCELLED" // Cancelled by guest or hotel
  | "NO_SHOW" // Guest didn't arrive
  | "REFUNDED"; // Payment refunded

export interface BookingRequest {
  inquiryId: string; // Links back to the original inquiry
  hotelId: string;
  roomTypeId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  specialRequests?: string;
  totalAmount: number;
  currency: "NPR";
}

export interface Booking {
  id: string;
  bookingReference: string; // e.g. SH-2024-000123
  inquiryId: string;
  hotelId: string;
  roomTypeId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  rooms: number;
  specialRequests?: string;
  status: BookingStatus;
  totalAmount: number;
  commissionAmount: number;
  netAmount: number; // totalAmount - commissionAmount
  currency: "NPR";
  paymentId?: string;
  confirmedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Payments ──

export type PaymentMethod =
  | "BANK_TRANSFER"
  | "ESEWA"
  | "KHALTI"
  | "CONNECT_IPS"
  | "CASH_ON_ARRIVAL"
  | "CARD";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export interface PaymentIntent {
  id: string;
  bookingId: string;
  amount: number;
  currency: "NPR";
  method: PaymentMethod;
  status: PaymentStatus;
  providerReference?: string; // Gateway transaction ID
  paidAt?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentVerification {
  paymentIntentId: string;
  providerReference: string;
  amount: number;
  verified: boolean;
}

// ── Commissions ──

export interface Commission {
  id: string;
  bookingId: string;
  hotelId: string;
  bookingAmount: number;
  commissionRate: number; // Percentage, e.g. 10
  commissionAmount: number;
  status: CommissionStatus;
  invoiceId?: string;
  settledAt?: string;
  createdAt: string;
}

export type CommissionStatus =
  | "PENDING" // Booking confirmed, commission calculated
  | "INVOICED" // Invoice sent to hotel
  | "SETTLED" // Payment received from hotel
  | "WAIVED"; // Commission waived (promo, partnership deal)

export interface CommissionSummary {
  hotelId: string;
  period: string; // e.g. "2024-12"
  totalBookings: number;
  totalRevenue: number;
  totalCommission: number;
  averageRate: number;
  status: "PENDING" | "INVOICED" | "SETTLED";
}

// ── Reviews ──

export interface GuestReview {
  id: string;
  bookingId: string;
  hotelId: string;
  guestName: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  categories: {
    cleanliness: number;
    location: number;
    value: number;
    service: number;
    amenities: number;
  };
  hotelResponse?: string;
  isVerified: boolean; // Came from a confirmed booking
  isPublished: boolean;
  createdAt: string;
}

// ── Partner Dashboard ──

export interface HotelDashboardStats {
  hotelId: string;
  period: string;
  totalInquiries: number;
  confirmedBookings: number;
  conversionRate: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
  pageViews: number;
}

// ── API Response Envelope ──

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    perPage?: number;
    total?: number;
    totalPages?: number;
  };
}
