import 'reflect-metadata';
import { validate, ValidationError } from 'class-validator';

export abstract class BaseSchema {
    abstract attributes: Attribute[];
    async validate(instance: any): Promise<ValidationError[]> {
      return validate(instance);
    }
  }
  

export class Attribute {
  key: string;
  type: any;
  required: boolean;
  access: string[];
  validation: { decorator: any, args?: any[] }[];

  constructor(options: AttributeOptions) {
    this.key = options.key;
    this.type = options.type;
    this.required = options.required || false;
    this.access = options.access || [];
    this.validation = options.validation || [];
  }
}

export interface AttributeOptions {
  key: string;
  type: any;
  required?: boolean;
  access?: string[];
  validation?: { decorator: any, args?: any[] }[];
}
