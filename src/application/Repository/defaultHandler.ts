import { PrismaClient } from '@prisma/client';

export interface Repository<T,DTO> {
  create(data: DTO): Promise<T>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: string, data: Partial<DTO>): Promise<T>;
  delete(id: string): Promise<T>;
}

export class DefaultRepository<T,DTO> implements Repository<T,DTO> {
  private prisma = new PrismaClient();

  constructor(private modelName: keyof PrismaClient) {}

  public getModel() {
    return this.prisma[this.modelName] as any;
  }

  async create(data: DTO): Promise<T> {
    const entity = await this.getModel().create({
      data:(data)
    });
    return entity as T;
  }

  async getById(id: string): Promise<T | null> {
    const entity = await this.getModel().findUnique({
      where: { id }
    });
    return entity as T | null;
  }

  async getAll(): Promise<T[]> {
    const entities = await this.getModel().findMany();
    return entities as T[];
  }

  async update(id: string, data: Partial<DTO>): Promise<T> {
    const entity = await this.getModel().update({
      where: { id },
      data:(data)
    });
    return entity as T;
  }

  async delete(id: string): Promise<T> {
    const entity = await this.getModel().delete({
      where: { id }
    });
    return entity as T;
  }
}
