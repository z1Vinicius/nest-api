import ProductEntity from '../../products/entities/product.entity';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @OneToOne(() => ProductEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'CD_PRODUCT' })
  product: ProductEntity;

  constructor(order: OrderEntity, product: ProductEntity, quantity: number) {
    this.order = order;
    this.product = product;
    this.quantity = quantity;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async refreshTotalPrice() {
    this.totalPrice = this.product.price * this.quantity;
  }
}

export default OrderItemEntity;
