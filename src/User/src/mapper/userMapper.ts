// UserMapper.ts

import { BaseMapper } from "../../../application/Mapper/baseMapper";
import { UserSchema } from "../schema/userSchema";


export class UserMapper extends BaseMapper<UserSchema> {
  protected schema: UserSchema;

  constructor() {
    super();
    this.schema = new UserSchema();
  }

  // Forward mapping: Convert plain data to schema instance
  forward(data: any): UserSchema {
    return this.forwardBase(data);
  }

  // Reverse mapping: Convert schema instance to plain data with access control
  reverse(user: UserSchema, method: string): any {
    return this.reverseBase(user, method);
  }

  // Create a new instance of UserSchema
  protected createInstance(): UserSchema {
    return new UserSchema();
  }
}
