import DefaultInterface from "../Interface/baseInterface";

class BaseService<T, DTO> {
  constructor(private repository: DefaultInterface<T, DTO>) {}

  async create(data: DTO): Promise<T> {
    return this.repository.create(data);
  }

  async getById(id: number): Promise<T | null> {
    return this.repository.getById(id);
  }

  async getAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  async update(id: number, data: Partial<DTO>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<T> {
    return this.repository.delete(id);
  }
}
export default BaseService;