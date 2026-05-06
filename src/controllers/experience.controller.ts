import { repositories } from '@/core/repository.container';
import { ApiResponseHandler } from '@/core/api-response.handler';
import { CreateExperienceSchema, ExperienceFilterSchema } from '@/dtos';

export class ExperienceController {
  async listExperiences(filters: any) {
    const validatedFilters = ExperienceFilterSchema.parse(filters);
    const experiences = await repositories.experienceRepository.findAll(validatedFilters);
    return ApiResponseHandler.success(experiences, 'Experiences retrieved');
  }

  async getExperience(id: string) {
    const experience = await repositories.experienceRepository.findById(id);
    if (!experience) {
      return ApiResponseHandler.error('Experience not found', 'Not Found');
    }
    return ApiResponseHandler.success(experience, 'Experience retrieved');
  }

  async createExperience(data: any) {
    const validatedData = CreateExperienceSchema.parse(data);
    const experience = await repositories.experienceRepository.create(validatedData);
    return ApiResponseHandler.success(experience, 'Experience created');
  }

  async updateExperience(id: string, data: any) {
    const experience = await repositories.experienceRepository.update(id, data);
    return ApiResponseHandler.success(experience, 'Experience updated');
  }

  async deleteExperience(id: string) {
    await repositories.experienceRepository.delete(id);
    return ApiResponseHandler.success(null, 'Experience deleted');
  }

  async getByCategory(category: string) {
    const experiences = await repositories.experienceRepository.findByCategory(category);
    return ApiResponseHandler.success(experiences, 'Experiences by category retrieved');
  }

  async getFeatured(limit: number = 6) {
    const experiences = await repositories.experienceRepository.getFeaturedExperiences(limit);
    return ApiResponseHandler.success(experiences, 'Featured experiences retrieved');
  }
}

export const experienceController = new ExperienceController();
