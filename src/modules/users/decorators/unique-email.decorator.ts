import { registerDecorator, ValidationOptions } from 'class-validator';
import UniqueEmailValidator from '../validation/unique-email.validator';

const UniqueEmail = (options: ValidationOptions) => {
  return (object: Object, proprieties: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: proprieties,
      options: options,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};

export default UniqueEmail;
