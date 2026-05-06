import { z } from 'zod';

// ─── Create Inquiry ───
export const CreateInquirySchema = z.object({
  hotelId: z.string().cuid('Invalid hotel ID'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  checkInDate: z.string().datetime().optional(),
  checkOutDate: z.string().datetime().optional(),
  numberOfGuests: z.number().min(1).max(20),
  specialRequests: z.string().optional(),
});

export type CreateInquiryDTO = z.infer<typeof CreateInquirySchema>;

// ─── Inquiry Response ───
export interface InquiryResponseDTO {
  id: string;
  hotelId: string;
  userId: string;
  message: string;
  status: 'PENDING' | 'RESPONDED' | 'CLOSED';
  checkInDate?: Date;
  checkOutDate?: Date;
  numberOfGuests: number;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Update Inquiry Status ───
export const UpdateInquiryStatusSchema = z.object({
  status: z.enum(['PENDING', 'RESPONDED', 'CLOSED']),
  response: z.string().optional(),
});

export type UpdateInquiryStatusDTO = z.infer<typeof UpdateInquiryStatusSchema>;
