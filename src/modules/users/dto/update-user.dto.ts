import { Injectable } from '@nestjs/common';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import UniqueEmail from '../decorators/unique-email.decorator';

Injectable();
class UpdateUserDTO {
  @IsString({ message: 'O nome precisa ser do tipo string' })
  @IsOptional()
  name: string;

  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @IsOptional()
  @UniqueEmail({ message: 'E-mail já cadastrado' })
  email: string;

  @IsStrongPassword({ minLength: 6 }, { message: 'O tamanho mínimo para senha é 6' })
  @IsOptional()
  password: string;
}

export default UpdateUserDTO;
