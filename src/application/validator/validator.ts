import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { BaseSchema } from '../schema/baseSchema';
import Ajv from 'ajv';

const ajv = new Ajv();

export function validateRequest<T extends BaseSchema>(schema: T, accessType: string) {
  const jsonSchema = schema.toJsonSchema(accessType);
  const validate = ajv.compile(jsonSchema);

  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
      // For GET requests, you might need to validate query parameters instead
      // Implement custom logic here if needed
      return next();
    }

    // For POST, PATCH, etc., validate request body
    const instance = plainToInstance(schema.constructor as any, req.body);
    const errors = await schema.validate(instance, accessType);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => ({
          property: err.property,
          constraints: err.constraints
        }))
      });
    }

    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({
        message: 'JSON Schema validation failed',
        errors: validate.errors
      });
    }

    next();
  };
}
