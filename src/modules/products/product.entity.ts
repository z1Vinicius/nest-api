import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ name: 'CREATED_AT' })
  createAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt: Date;
}

export default ProductEntity;
