import { z } from 'zod';

// ─── Hotel Create/Update ───
export const CreateHotelSchema = z.object({
  name: z.string().min(2, 'Hotel name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(2),
  priceRange: z.object({ min: z.number(), max: z.number() }),
  amenities: z.array(z.string()),
  coverImage: z.string().url().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,}$/),
  email: z.string().email(),
  website: z.string().url().optional(),
});

export type CreateHotelDTO = z.infer<typeof CreateHotelSchema>;

// ─── Hotel Response ───
export interface HotelResponseDTO {
  id: string;
  name: string;
  description: string;
  location: string;
  priceRange: { min: number; max: number };
  amenities: string[];
  coverImage?: string;
  latitude?: number;
  longitude?: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Hotel Search Filters ───
export const HotelFilterSchema = z.object({
  location: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  limit: z.number().min(1).max(100).default(20),
  page: z.number().min(1).default(1),
});

export type HotelFilterDTO = z.infer<typeof HotelFilterSchema>;
