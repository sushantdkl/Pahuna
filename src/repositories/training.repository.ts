import { db } from '@/lib/db';
import { BaseRepository } from './base.repository';

export class TrainingRepository extends BaseRepository {
  constructor() {
    super(db);
  }

  async create(data: any) {
    return await this.prisma.trainingCourse.create({ data });
  }

  async findById(id: string) {
    return await this.prisma.trainingCourse.findUnique({
      where: { id },
      include: { enrollments: true },
    });
  }

  async findAll() {
    return await this.prisma.trainingCourse.findMany({
      include: { _count: { select: { enrollments: true } } },
    });
  }

  async update(id: string, data: any) {
    return await this.prisma.trainingCourse.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.trainingCourse.delete({ where: { id } });
  }

  async enroll(data: any) {
    return await this.prisma.trainingEnrollment.create({ data });
  }
}
