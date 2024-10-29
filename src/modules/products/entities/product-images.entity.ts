import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import ProductEntity from './product.entity';

@Entity({ name: 'TB_PRODUCT_IMAGES', schema: process.env.DATABASE_SCHEMA })
class ProductImageEntity {
  @PrimaryGeneratedColumn('increment', { name: 'CD_PRODUCT_IMAGE' })
  id: number;

  @Column({ name: 'URL', nullable: false })
  url: string;

  @Column({ name: 'DE_PRODUCT_IMAGE' })
  description: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}

export default ProductImageEntity;
