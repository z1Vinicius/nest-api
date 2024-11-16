import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import RecipeEntity from './recipe.entity';

@Entity({ name: 'TB_RECIPE_INGREDIENTS', schema: process.env.DATABASE_SCHEMA })
class RecipeIngredientsEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column({ name: 'NAME', nullable: false })
  name: string;

  @Column({ name: 'UNIT' })
  unit: string;
  
  @Column({ name: 'COUNT' })
  count: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.images, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}

export default RecipeIngredientsEntity;
