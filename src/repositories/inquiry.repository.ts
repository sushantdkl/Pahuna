import { db } from '@/lib/db';
import { BaseRepository } from './base.repository';
import { InquiryStatus } from '@prisma/client';

export class InquiryRepository extends BaseRepository {
  constructor() {
    super(db);
  }

  async create(data: any) {
    return await this.prisma.inquiry.create({
      data,
      include: { hotel: true },
    });
  }

  async findById(id: string) {
    return await this.prisma.inquiry.findUnique({
      where: { id },
      include: { hotel: true },
    });
  }

  async findAll(filters?: any) {
    const { hotelId, status, limit = 20, page = 1 } = filters || {};
    const skip = (page - 1) * limit;

    return await this.prisma.inquiry.findMany({
      where: {
        ...(hotelId && { hotelId }),
        ...(status && { status: status as InquiryStatus }),
      },
      include: { hotel: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: any) {
    return await this.prisma.inquiry.update({
      where: { id },
      data,
      include: { hotel: true },
    });
  }

  async delete(id: string) {
    await this.prisma.inquiry.delete({ where: { id } });
  }

  // ─── Custom Queries ───
  async findByHotelId(hotelId: string) {
    return await this.prisma.inquiry.findMany({
      where: { hotelId },
      include: { hotel: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string, notes?: string) {
    return await this.prisma.inquiry.update({
      where: { id },
      data: { status: status as InquiryStatus, ...(notes && { notes }) },
    });
  }

  async countByStatus(status: string) {
    return await this.prisma.inquiry.count({ where: { status: status as InquiryStatus } });
  }
}
