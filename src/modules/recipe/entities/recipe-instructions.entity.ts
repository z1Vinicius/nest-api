import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity, ObjectIdColumn } from 'typeorm';
import RecipeEntity from './recipe.entity';

class RecipeInstructionsEntity extends BaseEntity  {
  @ObjectIdColumn()
  id!: number;

  @Column()
  description: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.instructions, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}

export default RecipeInstructionsEntity;
