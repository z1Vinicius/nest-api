import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrderItemEntity from './../../orders/entities/order-item.entity';
import ProductCategoryEntity from './product-category.entity';
import ProductDetailEntity from './product-details.entity';
import ProductImageEntity from './product-images.entity';

@Entity({ name: 'TB_PRODUCTS', schema: process.env.DATABASE_SCHEMA })
class ProductEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_PRODUCT' })
  id!: string;

  @Column({ name: 'NAME', nullable: false })
  name: string;

  @Column({ name: 'PRODUCT_PRICE', default: 0 })
  price: number;

  @Column({ name: 'PRODUCT_DE' })
  description: string;

  @Column({ name: 'ACTIVE', default: true })
  active: boolean;

  @Column({ name: 'AVAILABLE', default: 0 })
  available: number;

  @ManyToOne(() => ProductCategoryEntity, { nullable: true, eager: true, cascade: true })
  category: ProductCategoryEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product, { cascade: true })
  orderItems: OrderItemEntity[];

  @OneToMany(() => ProductImageEntity, (product) => product.product, { nullable: true, eager: true, cascade: true })
  images!: ProductImageEntity[];

  @OneToMany(() => ProductDetailEntity, (product) => product.product, { nullable: true, eager: true, cascade: true })
  details!: ProductDetailEntity[];

  @CreateDateColumn({ name: 'CREATED_AT' })
  createAt!: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt!: Date;
}

export default ProductEntity;
