import { Injectable } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import UniqueEmail from '../decorators/unique-email.decorator';

Injectable();
class CreateUserDTO {
  @IsString({ message: 'O nome precisa ser do tipo string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @IsNotEmpty({ message: 'É necessário passar um e-mail' })
  @UniqueEmail({ message: 'E-mail já cadastrado' })
  email: string;

  @IsStrongPassword(
    { minLength: 6 },
    { message: 'O tamanho mínimo para senha é 6' },
  )
  @IsNotEmpty({ message: 'É necessário passar uma senha' })
  password: string;
}

export default CreateUserDTO;
