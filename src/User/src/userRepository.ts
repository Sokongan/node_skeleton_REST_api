// userRepository.ts
import { DefaultRepository } from '../../application/Repository/defaultHandler';
import { UserDTO } from '../../DTO/userDTO';
import { User } from '@prisma/client';

export class UserRepository extends DefaultRepository<User, UserDTO> {
  constructor() {
    super('user'); // Assuming 'user' is the model name in Prisma schema
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.getModel().findUnique({ where: { username } }) as User | null;
  }
}
export default UserRepository;