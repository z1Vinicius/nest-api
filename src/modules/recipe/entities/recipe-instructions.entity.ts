import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity, ObjectIdColumn } from 'typeorm';
import RecipeEntity from './recipe.entity';

@Entity({ name: 'TB_RECIPE_INSTRUCTIONS', schema: process.env.DATABASE_SCHEMA })
class RecipeInstructionsEntity extends BaseEntity  {
  @ObjectIdColumn()
  id!: number;

  @Column({ name: 'DE_RECIPE_DETAIL' })
  description: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.instructions, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}

export default RecipeInstructionsEntity;
