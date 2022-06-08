import Joi from 'joi';

export type JoiValidatorResponse<T> = {
  value: T;
  errors: Joi.ValidationErrorItem[];
}

export const encodeError = (message: string, error: Joi.ErrorReport): Joi.ErrorReport => {
  error.message = message;
  return error;
};

export const hasErrors = (errors: Joi.ValidationErrorItem[]) => errors.length > 0;

export const validate = (schema: Joi.ObjectSchema, params: any): JoiValidatorResponse<typeof params> => {
  const validator = schema.validate(params);
  const { value, error } = validator;

  return {
    value,
    errors: error?.details ?? [],
  };
};

export const errorsToMessage = (errors: Joi.ValidationErrorItem[]): string => errors.map((error) => error.message).join('\n');
