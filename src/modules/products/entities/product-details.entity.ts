import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity, ObjectIdColumn } from 'typeorm';
import ProductEntity from './product.entity';

@Entity({ name: 'TB_PRODUCT_DETAILS', schema: process.env.DATABASE_SCHEMA })
class ProductDetailEntity extends BaseEntity  {
  @ObjectIdColumn()
  id!: number;

  @Column({ name: 'NAME', nullable: false })
  name: string;

  @Column({ name: 'DE_PRODUCT_DETAIL' })
  description: string;

  @ManyToOne(() => ProductEntity, (product) => product.details, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}

export default ProductDetailEntity;
