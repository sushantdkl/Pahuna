import {
  HotelRepository,
  ExperienceRepository,
  InquiryRepository,
  UserRepository,
  TrainingRepository,
} from '@/repositories';

// ─── Singleton Instance Container ───
// Provides a centralized way to access all repositories

export class RepositoryContainer {
  private static instance: RepositoryContainer;

  public hotelRepository: HotelRepository;
  public experienceRepository: ExperienceRepository;
  public inquiryRepository: InquiryRepository;
  public userRepository: UserRepository;
  public trainingRepository: TrainingRepository;

  private constructor() {
    this.hotelRepository = new HotelRepository();
    this.experienceRepository = new ExperienceRepository();
    this.inquiryRepository = new InquiryRepository();
    this.userRepository = new UserRepository();
    this.trainingRepository = new TrainingRepository();
  }

  static getInstance(): RepositoryContainer {
    if (!RepositoryContainer.instance) {
      RepositoryContainer.instance = new RepositoryContainer();
    }
    return RepositoryContainer.instance;
  }
}

export const repositories = RepositoryContainer.getInstance();
