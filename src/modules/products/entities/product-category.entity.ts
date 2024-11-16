import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TB_PRODUCT_CATEGORIES', schema: process.env.DATABASE_SCHEMA })
class ProductCategoryEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column({ name: 'CATEGORY', nullable: false })
  name: string;

  @Column({ name: 'DE_PRODUCT_CATEGORY' })
  description: string;
}

export default ProductCategoryEntity;
