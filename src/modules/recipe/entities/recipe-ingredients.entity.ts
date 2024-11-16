import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import RecipeEntity from './recipe.entity';

class RecipeIngredientsEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column({  nullable: false })
  name: string;

  @Column()
  unit: string;
  
  @Column()
  count: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.images, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}

export default RecipeIngredientsEntity;
