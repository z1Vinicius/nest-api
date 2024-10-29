import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TB_PRODUCT_IMAGES', schema: process.env.DATABASE_SCHEMA })
class ProductImageEntity {
  @PrimaryGeneratedColumn('increment', { name: 'CD_PRODUCT_IMAGE' })
  id: number;

  @Column({ name: 'URL', nullable: false })
  url: string;

  @Column({ name: 'DE_PRODUCT_IMAGE' })
  description: string;
}

export default ProductImageEntity;
