import { db } from '@/lib/db';
import { BaseRepository } from './base.repository';
import { UserRole } from '@prisma/client';

export class UserRepository extends BaseRepository {
  constructor() {
    super(db);
  }

  async create(data: any) {
    return await this.prisma.user.create({
      data,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  }

  async update(id: string, data: any) {
    return await this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, role: true },
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }

  async findByRole(role: string) {
    return await this.prisma.user.findMany({
      where: { role: role as UserRole },
      select: { id: true, email: true, name: true, role: true },
    });
  }
}
