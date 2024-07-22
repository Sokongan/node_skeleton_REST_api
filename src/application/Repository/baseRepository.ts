import { PrismaClient } from '@prisma/client';
import DefaultInterface from '../Interface/baseInterface';


export class BaseRepository<T, DTO> implements DefaultInterface<T, DTO> {
  private prisma = new PrismaClient();

  constructor(
    private modelName: keyof PrismaClient,
    private createDtoToEntity: (dto: DTO) => any,
    private updateDtoToEntity: (dto: Partial<DTO>) => any
  ) {}

  private getModel() {
    return this.prisma[this.modelName] as any;
  }

  async create(data: DTO): Promise<T> {
    const entity = await this.getModel().create({
      data: this.createDtoToEntity(data)
    });
    return entity as T;
  }

  async getById(id: number): Promise<T | null> {
    const entity = await this.getModel().findUnique({
      where: { id }
    });
    return entity as T | null;
  }

  async getAll(): Promise<T[]> {
    const entities = await this.getModel().findMany();
    return entities as T[];
  }

  async update(id: number, data: Partial<DTO>): Promise<T> {
    const entity = await this.getModel().update({
      where: { id },
      data: this.updateDtoToEntity(data)
    });
    return entity as T;
  }

  async delete(id: number): Promise<T> {
    const entity = await this.getModel().delete({
      where: { id }
    });
    return entity as T;
  }
}
