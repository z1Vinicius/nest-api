import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import RecipeEntity from './recipe.entity';

class RecipeImageEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column({ nullable: false })
  url: string;

  @Column()
  description: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.images, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}

export default RecipeImageEntity;
