import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import UserService from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const hasEmail = await this.userService.getUserByEmail(value);
    if (!hasEmail) {
      return true;
    }
    return false;
  }
}

export default UniqueEmailValidator;
