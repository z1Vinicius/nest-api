import { registerDecorator, ValidationOptions } from 'class-validator';
import RequireUserValidator from '../validation/require-user.validator';

const RequireUser = (options: ValidationOptions) => {
  return (object: Object, proprieties: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: proprieties,
      options: options,
      constraints: [],
      validator: RequireUserValidator,
    });
  };
};

export default RequireUser;
