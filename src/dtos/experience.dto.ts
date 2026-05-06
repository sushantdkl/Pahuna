import { z } from 'zod';

// ─── Create Experience ───
export const CreateExperienceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20),
  category: z.enum(['CULTURE', 'ADVENTURE', 'FOOD', 'WELLNESS', 'NATURE']),
  duration: z.number().min(1, 'Duration must be at least 1 hour'),
  price: z.number().min(0),
  location: z.string(),
  images: z.array(z.string().url()).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  capacity: z.number().min(1),
  difficulty: z.enum(['EASY', 'MODERATE', 'DIFFICULT']).optional(),
});

export type CreateExperienceDTO = z.infer<typeof CreateExperienceSchema>;

// ─── Experience Response ───
export interface ExperienceResponseDTO {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  location: string;
  images: string[];
  latitude?: number;
  longitude?: number;
  capacity: number;
  difficulty?: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

// ─── Experience Filter ───
export const ExperienceFilterSchema = z.object({
  category: z.enum(['CULTURE', 'ADVENTURE', 'FOOD', 'WELLNESS', 'NATURE']).optional(),
  maxPrice: z.number().optional(),
  minDuration: z.number().optional(),
  maxDuration: z.number().optional(),
  difficulty: z.enum(['EASY', 'MODERATE', 'DIFFICULT']).optional(),
});

export type ExperienceFilterDTO = z.infer<typeof ExperienceFilterSchema>;
