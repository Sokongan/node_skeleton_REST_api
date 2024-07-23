import { IsNotEmpty, IsString } from 'class-validator';

// baseSchema.ts
export class Attribute {
  key: string;
  type: any;
  required: boolean;
  access: string[];
  validation: Array<{ decorator: any, args?: any[] }>;

  constructor(data: Partial<Attribute>) {
    Object.assign(this, data);
  }
}

export class BaseSchema {
  @IsNotEmpty()
  @IsString()
  resourceType: string;

  attributes: Attribute[];
  constructor(resourceType: string, attributes: Attribute[]) {
    this.resourceType = resourceType;
    this.attributes = attributes;
  }
}

