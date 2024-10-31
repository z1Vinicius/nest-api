import ProductEntity from './../../products/entities/product.entity';

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import OrderEntity from './order.entity';

@Entity({ name: 'TB_ORDERS_ITEMS', schema: process.env.DATABASE_SCHEMA })
class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_ORDER_ITEM' })
  id!: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;

  @OneToOne(() => ProductEntity, { cascade: true })
  @JoinColumn({ name: 'CD_PRODUCT' })
  product: ProductEntity;

  @Column({ name: 'QUANTITY', default: 0 })
  quantity: number;

  @Column({ name: 'TOTAL_PRICE', default: 0 })
  totalPrice: number;
}

export default OrderItemEntity;
