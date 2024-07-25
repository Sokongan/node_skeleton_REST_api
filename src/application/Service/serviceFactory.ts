
import { PrismaClient } from '@prisma/client';
import { DefaultService } from './defaultHandler';

export class ServiceFactory {
  static createService<T, DTO>(
    modelName: keyof PrismaClient,
    customService?: new () => DefaultService<T, DTO>
  ): DefaultService<T, DTO> {
    if (customService) {
      return new customService() as DefaultService<T, DTO>;
    }
    return new DefaultService<T, DTO>(modelName);
  }
}
