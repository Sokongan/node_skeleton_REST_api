// schema/UserSchema.ts
import 'reflect-metadata';
import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';
import { Attribute, BaseSchema } from '../../../application/schema/baseSchema';

export class UserSchema extends BaseSchema {
  declare attributes: Attribute[];

  constructor() {
    super('user', [
      new Attribute({
        key: 'firstName',
        type: String,
        required: true,
        access: ['GET', 'POST', 'PATCH'],
        validation: [
          { decorator: IsNotEmpty },
          { decorator: IsString },
          { decorator: Length, args: [0, 50] }
        ]
      }),
      new Attribute({
        key: 'middleName',
        type: String,
        required: false,
        access: ['GET', 'POST', 'PATCH'],
        validation: [
          { decorator: IsOptional },
          { decorator: IsString },
          { decorator: Length, args: [0, 50] }
        ]
      }),
      new Attribute({
        key: 'lastName',
        type: String,
        required: true,
        access: ['GET', 'POST', 'PATCH'],
        validation: [
          { decorator: IsNotEmpty },
          { decorator: IsString },
          { decorator: Length, args: [0, 50] }
        ]
      }),
      new Attribute({
        key: 'username',
        type: String,
        required: true,
        access: ['GET', 'POST', 'PATCH'],
        validation: [
          { decorator: IsNotEmpty },
          { decorator: IsString },
          { decorator: Length, args: [0, 50] }
        ]
      }),
      new Attribute({
        key: 'password',
        type: String,
        required: true,
        access: ['POST', 'PATCH'],
        validation: [
          { decorator: IsNotEmpty },
          { decorator: IsString },
          { decorator: Length, args: [6, 100] }
        ]
      })
    ]);
  }
}
