import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/orders.status.enum';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderStatusDto extends PartialType(CreateOrderDto) {
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}
