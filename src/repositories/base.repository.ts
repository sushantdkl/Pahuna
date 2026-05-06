// ─── Repository Base Class ───────────────────────────────────────────────
// Provides common patterns for database operations

import { PrismaClient } from '@prisma/client';

export abstract class BaseRepository {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: any): Promise<any> {
    throw new Error('create() method must be implemented');
  }

  async findById(id: string): Promise<any> {
    throw new Error('findById() method must be implemented');
  }

  async findAll(filters?: any): Promise<any[]> {
    throw new Error('findAll() method must be implemented');
  }

  async update(id: string, data: any): Promise<any> {
    throw new Error('update() method must be implemented');
  }

  async delete(id: string): Promise<void> {
    throw new Error('delete() method must be implemented');
  }
}
