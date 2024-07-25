// userService.ts

import { User } from '@prisma/client';
import { DefaultService } from '../../application/Service/defaultHandler';
import { UserDTO } from '../../DTO/userDTO';
import { UserRepository } from './userRepository';

export class UserService extends DefaultService<User, UserDTO> {
  declare public repository: UserRepository;

  constructor() {
    super('user');
    this.repository = new UserRepository(); // Use custom repository
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findByUsername(username);
  }
}
