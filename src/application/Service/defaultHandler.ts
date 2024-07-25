
import { PrismaClient } from '@prisma/client';
import { RepositoryFactory } from '../Repository/repositoryFactory';
import { DefaultRepository } from '../Repository/defaultHandler';

export interface Service<T, DTO> {
  create(data: DTO): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, data: Partial<DTO>): Promise<T>;
  delete(id: string): Promise<T>;
}

export class DefaultService<T, DTO> implements Service<T, DTO> {
  public repository: DefaultRepository<T, DTO>;

  constructor(
    public modelName: keyof PrismaClient,
  ) 
  {
    this.repository = RepositoryFactory.createRepository<T, DTO>(modelName);
  }

  async create(data: DTO): Promise<T> {
    return this.repository.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.getById(id);
  }

  async findAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  async update(id: string, data: Partial<DTO>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<T> {
    return this.repository.delete(id);
  }
}
