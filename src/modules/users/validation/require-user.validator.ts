import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import UserService from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
class RequireUserValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const hasUser = await this.userService.getUser(value);
    if (!hasUser) {
      return false;
    }
    return true;
  }
}

export default RequireUserValidator;
