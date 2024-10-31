import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enum/orders.status.enum';
import UserEntity from './../../users/entities/user.entity';
import OrderItemEntity from './order-item.entity';

@Entity({ name: 'TB_ORDERS', schema: process.env.DATABASE_SCHEMA })
class OrderEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_ORDER' })
  id!: string;

  @Column({ name: 'STATUS', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @ManyToOne(() => OrderItemEntity, (item) => item.order, { cascade: true })
  orderItems!: OrderItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.orders, { cascade: true, eager: true })
  user: UserEntity;

  @Column({ name: 'TOTAL', default: 0 })
  total: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createAt!: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt!: Date;

  constructor(user: UserEntity) {
    this.user = user;
  }
}

export default OrderEntity;
