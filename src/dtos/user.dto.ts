import { z } from 'zod';

// ─── User Registration ───
export const RegisterUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Must contain uppercase').regex(/[0-9]/, 'Must contain number'),
  name: z.string().min(2),
  role: z.enum(['TOURIST', 'HOTEL_OPERATOR', 'PARTNER']).default('TOURIST'),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

// ─── User Login ───
export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;

// ─── User Response (public) ───
export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  role: string;
  profileImage?: string;
  createdAt: Date;
}

// ─── User Update Profile ───
export const UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  profileImage: z.string().url().optional(),
});

export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;
