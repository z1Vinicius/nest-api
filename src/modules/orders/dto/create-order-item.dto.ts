import { IsNumber, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  quantity: number;

  @IsUUID()
  order: string;

  @IsUUID()
  product: string;
}
