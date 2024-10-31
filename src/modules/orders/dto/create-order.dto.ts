import RequireUser from '@modules/users/decorators/require-user.decorator';
import { IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @RequireUser({ message: 'Requer um usuário cadastrado' })
  user: string;
}
