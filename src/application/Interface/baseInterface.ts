// generic interface
interface DefaultInterface<T, DTO> {
  create(data: DTO): Promise<T>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: string, data: Partial<DTO>): Promise<T>;
  delete(id: string): Promise<T>;
}

export default DefaultInterface;
