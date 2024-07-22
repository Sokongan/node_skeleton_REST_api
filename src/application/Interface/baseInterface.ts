// generic interface
interface DefaultInterface<T, DTO> {
  create(data: DTO): Promise<T>;
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: number, data: Partial<DTO>): Promise<T>;
  delete(id: number): Promise<T>;
}

export default DefaultInterface;
