import ProductEntity from '@modules/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

enum OrderStatus {
  Delivered,
  Pending,
  Received,
  Separation,
  Processing,
}

Entity({ name: 'TB_ORDERS', schema: process.env.DATABASE_SCHEMA });
class OrderEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_ORDER' })
  id!: string;

  @Column({ name: 'STATUS' })
  status: OrderStatus;

  @ManyToOne(() => ProductEntity, { cascade: true, nullable: true })
  products: ProductEntity[];

  @Column({ name: 'TOTAL', default: 0 })
  total: number;
}

export default OrderEntity;
