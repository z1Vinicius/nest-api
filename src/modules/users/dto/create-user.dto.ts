import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches } from 'class-validator';
import UniqueEmail from '../decorators/unique-email.decorator';

const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_-+=<>?/])[A-Za-zd!@#$%^&*()_-+=<>?/]{8,}$';

Injectable();
class CreateUserDTO {
  @IsString({ message: 'O nome precisa ser do tipo string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @IsNotEmpty({ message: 'É necessário passar um e-mail' })
  @UniqueEmail({ message: 'E-mail já cadastrado' })
  email: string;

  @IsStrongPassword({ minLength: 6 }, { message: 'O tamanho mínimo para senha é 6' })
  @IsNotEmpty({ message: 'É necessário passar uma senha' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, { message: 'Senha não está no padrão' })
  password: string;
}

export default CreateUserDTO;
