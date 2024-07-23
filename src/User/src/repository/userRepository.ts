import { User } from "@prisma/client";

import { BaseRepository } from "../../../application/Repository/baseRepository";
import { UserDTO } from "../../../DTO/userDTO";

export class UserRepository extends BaseRepository<User, UserDTO> {
    constructor() {
      super(
        'user',
        (dto: UserDTO) => ({ ...dto }),
        (data: Partial<UserDTO>) => ({ ...data })
      );
    }
}
