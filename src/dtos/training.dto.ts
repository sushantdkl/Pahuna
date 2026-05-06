import { z } from 'zod';

// ─── Create Training Course ───
export const CreateTrainingCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  duration: z.number().min(1, 'Duration in hours'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  capacity: z.number().min(1),
  price: z.number().min(0),
  instructor: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export type CreateTrainingCourseDTO = z.infer<typeof CreateTrainingCourseSchema>;

// ─── Training Course Response ───
export interface TrainingCourseResponseDTO {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  capacity: number;
  price: number;
  instructor: string;
  startDate: Date;
  endDate: Date;
  enrolledCount: number;
  createdAt: Date;
}

// ─── Course Enrollment ───
export const EnrollCourseSchema = z.object({
  courseId: z.string().cuid(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  organization: z.string().optional(),
});

export type EnrollCourseDTO = z.infer<typeof EnrollCourseSchema>;
