import { IsNumber, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  product: string;

  @IsNumber()
  quantity: number;
}
