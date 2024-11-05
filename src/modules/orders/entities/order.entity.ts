import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enum/orders.status.enum';
import UserEntity from './../../users/entities/user.entity';
import OrderItemEntity from './order-item.entity';

@Entity({ name: 'TB_ORDERS', schema: process.env.DATABASE_SCHEMA })
class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_ORDER' })
  id!: string;

  @Column({ name: 'STATUS', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true, eager: true })
  orderItems: OrderItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.orders, { eager: true })
  user: UserEntity;

  @Column({ name: 'TOTAL', default: 0 })
  total: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createAt!: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async refreshTotalOrder() {
    this.total = this.orderItems.reduce((accumulator, current) => accumulator + current.quantity, 0);
  }
}

export default OrderEntity;
