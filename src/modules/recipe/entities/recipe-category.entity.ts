import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TB_RECIPE_CATEGORIES', schema: process.env.DATABASE_SCHEMA })
class RecipeCategoryEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column({ name: 'CATEGORY', nullable: false })
  name: string;

  @Column({ name: 'DE_RECIPE_CATEGORY' })
  description: string;
}

export default RecipeCategoryEntity;
