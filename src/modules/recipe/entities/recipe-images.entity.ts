import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import RecipeEntity from './recipe.entity';

@Entity({ name: 'TB_RECIPE_IMAGES', schema: process.env.DATABASE_SCHEMA })
class RecipeImageEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column({ name: 'URL', nullable: false })
  url: string;

  @Column({ name: 'DE_RECIPE_IMAGE' })
  description: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.images, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}

export default RecipeImageEntity;
