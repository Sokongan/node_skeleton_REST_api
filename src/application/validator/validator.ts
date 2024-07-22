// validator.ts
import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { BaseSchema } from '../schema/baseSchema';

export function validateRequest<T extends BaseSchema>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!schema || !schema.constructor) {
      return res.status(500).json({
        message: 'Validation schema is not properly initialized',
      });
    }
    
    const instance = plainToInstance(schema.constructor as any, req.body);
    const errors = await schema.validate(instance);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => ({
          property: err.property,
          constraints: err.constraints
        }))
      });
    }

    next();
  };
}
