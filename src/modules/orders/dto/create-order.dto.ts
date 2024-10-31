import RequireUser from '@modules/users/decorators/require-user.decorator';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsUUID()
  @RequireUser({ message: 'Requer um usuário cadastrado' })
  user: string;

  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
