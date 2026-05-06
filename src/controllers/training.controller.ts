import { repositories } from '@/core/repository.container';
import { ApiResponseHandler } from '@/core/api-response.handler';
import { CreateTrainingCourseSchema, EnrollCourseSchema } from '@/dtos';

export class TrainingController {
  async listCourses() {
    const courses = await repositories.trainingRepository.findAll();
    return ApiResponseHandler.success(courses, 'Training courses retrieved');
  }

  async getCourse(id: string) {
    const course = await repositories.trainingRepository.findById(id);
    if (!course) {
      return ApiResponseHandler.error('Course not found', 'Not Found');
    }
    return ApiResponseHandler.success(course, 'Course retrieved');
  }

  async createCourse(data: any) {
    const validatedData = CreateTrainingCourseSchema.parse(data);
    const course = await repositories.trainingRepository.create(validatedData);
    return ApiResponseHandler.success(course, 'Course created');
  }

  async updateCourse(id: string, data: any) {
    const course = await repositories.trainingRepository.update(id, data);
    return ApiResponseHandler.success(course, 'Course updated');
  }

  async enrollCourse(data: any) {
    const validatedData = EnrollCourseSchema.parse(data);
    const enrollment = await repositories.trainingRepository.enroll(validatedData);
    return ApiResponseHandler.success(enrollment, 'Enrolled successfully');
  }
}

export const trainingController = new TrainingController();
