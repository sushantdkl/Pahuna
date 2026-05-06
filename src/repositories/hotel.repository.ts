import { db } from '@/lib/db';
import { BaseRepository } from './base.repository';
import { HotelFilterDTO, HotelResponseDTO } from '@/dtos';

export class HotelRepository extends BaseRepository {
  constructor() {
    super(db);
  }

  async create(data: any) {
    return await this.prisma.hotel.create({
      data,
      include: { city: true },
    });
  }

  async findById(id: string) {
    return await this.prisma.hotel.findUnique({
      where: { id },
      include: { 
        city: true,
        images: true,
        amenities: true,
        _count: { select: { inquiries: true } }
      },
    });
  }

  async findAll(filters: HotelFilterDTO) {
    const { location, minPrice, maxPrice, amenities, rating, limit, page } = filters;
    const skip = (page - 1) * limit;

    return await this.prisma.hotel.findMany({
      where: {
        ...(location && { city: { name: { contains: location, mode: 'insensitive' } } }),
        ...(minPrice && { priceMin: { gte: minPrice } }),
        ...(maxPrice && { priceMax: { lte: maxPrice } }),
        ...(rating && { starRating: { gte: rating } }),
      },
      include: { city: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: any) {
    return await this.prisma.hotel.update({
      where: { id },
      data,
      include: { city: true },
    });
  }

  async delete(id: string) {
    await this.prisma.hotel.delete({ where: { id } });
  }

  // ─── Custom Queries ───
  async findByCity(cityId: string, limit: number = 20) {
    return await this.prisma.hotel.findMany({
      where: { cityId },
      take: limit,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async searchHotels(query: string) {
    return await this.prisma.hotel.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });
  }

  async getFeaturedHotels(limit: number = 6) {
    return await this.prisma.hotel.findMany({
      where: { isFeatured: true },
      take: limit,
      orderBy: { sortOrder: 'asc' },
    });
  }
}
