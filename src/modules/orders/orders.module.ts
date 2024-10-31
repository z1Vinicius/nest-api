import ProductEntity from '@modules/products/entities/product.entity';
import UserEntity from '@modules/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderItemEntity from './entities/order-item.entity';
import OrderEntity from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, UserEntity, ProductEntity])],
})
export class OrdersModule {}
