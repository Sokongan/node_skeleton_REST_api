// BaseMapper.ts
import { validateSync } from 'class-validator';

export abstract class BaseMapper<T extends object> {
  protected abstract schema: T;

  abstract forward(data: any): T;
  abstract reverse(data: T, method: string): any;

  protected validateSchema(instance: T): void {
    const errors = validateSync(instance);
    if (errors.length > 0) {
      throw new Error('Validation failed: ' + JSON.stringify(errors));
    }
  }

  // Base implementation for forward mapping
  protected forwardBase(data: any): T {
    const instance = this.createInstance();
    this.mapAttributes(data, instance);
    this.validateSchema(instance);
    return instance;
  }

  // Base implementation for reverse mapping with access control
  protected reverseBase(instance: T, method: string): any {
    const result: any = {};
    if (this.schema['attributes']) {
      this.schema['attributes'].forEach((attribute: any) => {
        if (instance[attribute.key] !== undefined && attribute.access.includes(method)) {
          result[attribute.key] = instance[attribute.key];
        }
      });
    }
    return result;
  }

  // Method to create an instance of the schema
  protected abstract createInstance(): T;

  // Method to map data to schema instance
  private mapAttributes(data: any, instance: T): void {
    if (this.schema['attributes']) {
      this.schema['attributes'].forEach((attribute: any) => {
        if (data[attribute.key] !== undefined) {
          instance[attribute.key] = data[attribute.key];
        }
      });
    }
  }
}
