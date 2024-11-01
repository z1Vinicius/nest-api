import ProductEntity from '../../products/entities/product.entity';

import { BadRequestException } from '@nestjs/common';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import OrderEntity from './order.entity';

@Entity({ name: 'TB_ORDERS_ITEMS', schema: process.env.DATABASE_SCHEMA })
class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_ORDER_ITEM' })
  id!: string;

  @Column({ name: 'QUANTITY', default: 0 })
  quantity: number;

  @Column({ name: 'TOTAL_PRICE', default: 0 })
  totalPrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems, { cascade: ['update'], eager: true })
  product: ProductEntity;

  constructor(product: ProductEntity, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async refreshTotalPrice() {
    this.totalPrice = this.product.price * this.quantity;
  }

  @BeforeInsert()
  private async refreshTotal() {
    if (this.quantity > this.product.available) {
      throw new BadRequestException(
        `Quantidade de produto (${this.quantity}) maior que a quantidade disponível (${this.product.available}).`,
      );
    }
    this.product.available = this.product.available - this.quantity;
  }
}

export default OrderItemEntity;
