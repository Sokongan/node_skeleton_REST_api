import { DefaultRepository } from './defaultHandler';
import { PrismaClient } from '@prisma/client';

export class RepositoryFactory {
  static createRepository<T, DTO>(
    modelName: keyof PrismaClient,
  ): DefaultRepository<T, DTO> {
    console.log(modelName)
    return new DefaultRepository<T, DTO>(modelName);
  }
}
