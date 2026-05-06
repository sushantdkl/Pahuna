import { z } from 'zod';

// ─── Create Itinerary ───
export const CreateItinerarySchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  days: z.number().min(1).max(30),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  experiences: z.array(z.string().cuid()),
  hotels: z.array(z.string().cuid()),
  budget: z.number().min(0),
  isPublic: z.boolean().default(false),
});

export type CreateItineraryDTO = z.infer<typeof CreateItinerarySchema>;

// ─── Itinerary Response ───
export interface ItineraryResponseDTO {
  id: string;
  title: string;
  description?: string;
  days: number;
  startDate: Date;
  endDate: Date;
  budget: number;
  estimatedCost: number;
  experiences: Array<{ id: string; title: string }>;
  hotels: Array<{ id: string; name: string }>;
  isPublic: boolean;
  createdAt: Date;
}
