import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductCategoryEntity from './product-category.entity';
import ProductDetailEntity from './product-details.entity';
import ProductImageEntity from './product-images.entity';

@Entity({ name: 'TB_PRODUCTS', schema: process.env.DATABASE_SCHEMA })
class ProductEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_PRODUCT' })
  id: string;

  @Column({ name: 'NAME', nullable: false })
  name: string;

  @Column({ name: 'PRODUCT_PRICE', default: 0 })
  price: number;

  @Column({ name: 'PRODUCT_DE' })
  description: string;

  @Column({ name: 'ACTIVE', default: true })
  active: boolean;

  @JoinColumn({ name: 'CD_PRODUCT_CATEGORY' })
  @OneToOne(() => ProductCategoryEntity, { cascade: true, nullable: true, eager: true })
  category: ProductCategoryEntity;

  @OneToMany(() => ProductImageEntity, null, { eager: true, nullable: true })
  images: ProductImageEntity[];

  @OneToMany(() => ProductDetailEntity, null, { eager: true, nullable: true })
  details: ProductImageEntity[];

  @CreateDateColumn({ name: 'CREATED_AT' })
  createAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt: Date;
}

export default ProductEntity;
