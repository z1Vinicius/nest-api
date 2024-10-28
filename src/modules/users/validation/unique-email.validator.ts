import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import UserRepository from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const hasEmail = await this.userRepository.hasEmailRegistered(value);
    return !hasEmail;
  }
}

export default UniqueEmailValidator;
