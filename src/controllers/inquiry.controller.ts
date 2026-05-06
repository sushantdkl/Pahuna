import { repositories } from '@/core/repository.container';
import { ApiResponseHandler } from '@/core/api-response.handler';
import { CreateInquirySchema, UpdateInquiryStatusSchema } from '@/dtos';

export class InquiryController {
  async listInquiries(filters: any) {
    const inquiries = await repositories.inquiryRepository.findAll(filters);
    return ApiResponseHandler.success(inquiries, 'Inquiries retrieved');
  }

  async getInquiry(id: string) {
    const inquiry = await repositories.inquiryRepository.findById(id);
    if (!inquiry) {
      return ApiResponseHandler.error('Inquiry not found', 'Not Found');
    }
    return ApiResponseHandler.success(inquiry, 'Inquiry retrieved');
  }

  async createInquiry(data: any) {
    const validatedData = CreateInquirySchema.parse(data);
    const inquiry = await repositories.inquiryRepository.create(validatedData);
    return ApiResponseHandler.success(inquiry, 'Inquiry created successfully');
  }

  async updateInquiryStatus(id: string, data: any) {
    const validatedData = UpdateInquiryStatusSchema.parse(data);
    const inquiry = await repositories.inquiryRepository.updateStatus(
      id,
      validatedData.status,
      validatedData.response
    );
    return ApiResponseHandler.success(inquiry, 'Inquiry status updated');
  }

  async deleteInquiry(id: string) {
    await repositories.inquiryRepository.delete(id);
    return ApiResponseHandler.success(null, 'Inquiry deleted');
  }

  async getHotelInquiries(hotelId: string) {
    const inquiries = await repositories.inquiryRepository.findByHotelId(hotelId);
    return ApiResponseHandler.success(inquiries, 'Hotel inquiries retrieved');
  }
}

export const inquiryController = new InquiryController();
