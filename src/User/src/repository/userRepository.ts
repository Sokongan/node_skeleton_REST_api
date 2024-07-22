import { User } from "@prisma/client";
import { userDTO } from "../../../DTO/userDTO";
import { BaseRepository } from "../../../application/Repository/baseRepository";

export class UserRepository extends BaseRepository<User, userDTO> {
    constructor() {
      super(
        'user',
        (dto: userDTO) => ({ ...dto }),
        (data: Partial<userDTO>) => ({ ...data })
      );
    }
}
