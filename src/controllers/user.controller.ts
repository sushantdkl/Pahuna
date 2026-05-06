import { repositories } from '@/core/repository.container';
import { ApiResponseHandler } from '@/core/api-response.handler';
import { RegisterUserSchema, LoginUserSchema, UpdateProfileSchema } from '@/dtos';

export class UserController {
  async getUserProfile(id: string) {
    const user = await repositories.userRepository.findById(id);
    if (!user) {
      return ApiResponseHandler.error('User not found', 'Not Found');
    }
    return ApiResponseHandler.success(user, 'User profile retrieved');
  }

  async updateProfile(id: string, data: any) {
    const validatedData = UpdateProfileSchema.parse(data);
    const user = await repositories.userRepository.update(id, validatedData);
    return ApiResponseHandler.success(user, 'Profile updated successfully');
  }

  async listUsers() {
    const users = await repositories.userRepository.findAll();
    return ApiResponseHandler.success(users, 'Users retrieved');
  }
}

export const userController = new UserController();
