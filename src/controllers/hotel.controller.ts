import { repositories } from '@/core/repository.container';
import { ApiResponseHandler } from '@/core/api-response.handler';
import { CreateHotelSchema, HotelFilterSchema, HotelResponseDTO } from '@/dtos';

export class HotelController {
  // ─── GET /api/hotels ───
  async listHotels(filters: any) {
    const validatedFilters = HotelFilterSchema.parse(filters);
    const hotels = await repositories.hotelRepository.findAll(validatedFilters);
    return ApiResponseHandler.success(hotels, 'Hotels retrieved successfully');
  }

  // ─── GET /api/hotels/:id ───
  async getHotel(id: string) {
    const hotel = await repositories.hotelRepository.findById(id);
    if (!hotel) {
      return ApiResponseHandler.error('Hotel not found', 'Not Found');
    }
    return ApiResponseHandler.success(hotel, 'Hotel retrieved successfully');
  }

  // ─── POST /api/hotels ───
  async createHotel(data: any) {
    const validatedData = CreateHotelSchema.parse(data);
    const hotel = await repositories.hotelRepository.create(validatedData);
    return ApiResponseHandler.success(hotel, 'Hotel created successfully');
  }

  // ─── PUT /api/hotels/:id ───
  async updateHotel(id: string, data: any) {
    const hotel = await repositories.hotelRepository.update(id, data);
    return ApiResponseHandler.success(hotel, 'Hotel updated successfully');
  }

  // ─── DELETE /api/hotels/:id ───
  async deleteHotel(id: string) {
    await repositories.hotelRepository.delete(id);
    return ApiResponseHandler.success(null, 'Hotel deleted successfully');
  }

  // ─── GET /api/hotels/city/:cityId ───
  async getHotelsByCity(cityId: string, limit: number = 20) {
    const hotels = await repositories.hotelRepository.findByCity(cityId, limit);
    return ApiResponseHandler.success(hotels, 'Hotels retrieved successfully');
  }

  // ─── GET /api/hotels/search/:query ───
  async searchHotels(query: string) {
    const hotels = await repositories.hotelRepository.searchHotels(query);
    return ApiResponseHandler.success(hotels, 'Search results retrieved');
  }

  // ─── GET /api/hotels/featured ───
  async getFeaturedHotels(limit: number = 6) {
    const hotels = await repositories.hotelRepository.getFeaturedHotels(limit);
    return ApiResponseHandler.success(hotels, 'Featured hotels retrieved');
  }
}

export const hotelController = new HotelController();
