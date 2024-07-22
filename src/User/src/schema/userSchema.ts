import 'reflect-metadata';
import { IsNotEmpty, IsString, Length, IsOptional, IsInt, Min, Max } from 'class-validator';
import { BaseSchema, Attribute } from '../../../application/schema/baseSchema';

export class UserSchema extends BaseSchema {
  attributes: Attribute[];

  constructor() {
    super();
    this.attributes = [
      new Attribute({
        key: 'firstName',
        type: String,
        required: true,
        access: ['GET', 'POST', 'PATCH'],
        validation: [
          { decorator: IsNotEmpty },
          { decorator: IsString },
          { decorator: Length, args: [2, 50] }
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
          { decorator: Length, args: [2, 50] }
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
          { decorator: Length, args: [2, 50] }
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
          { decorator: Length, args: [2, 50] }
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
      }),
      new Attribute({
        key: 'age',
        type: Number,
        required: false,
        access: ['GET', 'POST', 'PATCH'],
        validation: [
          { decorator: IsOptional },
          { decorator: IsInt },
          { decorator: Min, args: [0] },
          { decorator: Max, args: [120] }
        ]
      })
    ];
  }
}
