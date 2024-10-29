import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TB_PRODUCT_DETAILS', schema: process.env.DATABASE_SCHEMA })
class ProductDetailEntity {
  @PrimaryGeneratedColumn('increment', { name: 'CD_PRODUCT_DETAIL' })
  id: number;

  @Column({ name: 'NAME', nullable: false })
  name: string;

  @Column({ name: 'DE_PRODUCT_DETAIL' })
  description: string;
}

export default ProductDetailEntity;
