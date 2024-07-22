import { User } from "@prisma/client";
import BaseService from "../../../application/Service/baseService";
import { userDTO } from "../../../DTO/userDTO";
import { UserRepository } from "../repository/userRepository";

export class UserService extends BaseService<User, userDTO> {
  constructor() {
    super(new UserRepository());
  }
}
