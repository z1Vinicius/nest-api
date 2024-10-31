import ProductEntity from '@modules/products/entities/product.entity';
import UserEntity from '@modules/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderItemEntity from './entities/order-item.entity';
import OrderEntity from './entities/order.entity';
import { OrderItemService } from './order-item.service';
import { OrderItemsController } from './orders-item.controller';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController, OrderItemsController],
  providers: [OrdersService, OrderItemService],
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, UserEntity, ProductEntity])],
})
export class OrdersModule {}
