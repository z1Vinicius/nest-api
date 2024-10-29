import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TB_PRODUCT_CATEGORIES', schema: process.env.DATABASE_SCHEMA })
class ProductCategoryEntity {
  @PrimaryGeneratedColumn('increment', { name: 'CD_PRODUCT_CATEGORY' })
  id!: number;

  @Column({ name: 'CATEGORY', nullable: false })
  name: string;

  @Column({ name: 'DE_PRODUCT_CATEGORY' })
  description: string;
}

export default ProductCategoryEntity;
