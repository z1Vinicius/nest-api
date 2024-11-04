import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @IsNotEmpty({ message: 'Necessário informar a senha' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  password: string;
}
