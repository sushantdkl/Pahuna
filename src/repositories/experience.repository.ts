import { db } from '@/lib/db';
import { BaseRepository } from './base.repository';
import { ExperienceFilterDTO } from '@/dtos';
import { ExperienceCategory } from '@prisma/client';

export class ExperienceRepository extends BaseRepository {
  constructor() {
    super(db);
  }

  async create(data: any) {
    return await this.prisma.experience.create({
      data,
      include: { city: true },
    });
  }

  async findById(id: string) {
    return await this.prisma.experience.findUnique({
      where: { id },
      include: { city: true },
    });
  }

  async findAll(filters: ExperienceFilterDTO) {
    const { category, maxPrice, minDuration, maxDuration, difficulty } = filters;

    return await this.prisma.experience.findMany({
      where: {
        ...(category && { category: category as ExperienceCategory }),
        ...(difficulty && { difficulty }),
      },
      include: { city: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: any) {
    return await this.prisma.experience.update({
      where: { id },
      data,
      include: { city: true },
    });
  }

  async delete(id: string) {
    await this.prisma.experience.delete({ where: { id } });
  }

  // ─── Custom Queries ───
  async findByCategory(category: string) {
    return await this.prisma.experience.findMany({
      where: { category: category as ExperienceCategory },
      take: 12,
    });
  }

  async getFeaturedExperiences(limit: number = 6) {
    return await this.prisma.experience.findMany({
      where: { isFeatured: true },
      take: limit,
      orderBy: { sortOrder: 'asc' },
    });
  }
}
