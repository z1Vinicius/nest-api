import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import RecipeCategoryEntity from './recipe-category.entity';
import RecipeInstructionsEntity from './recipe-instructions.entity';
import RecipeImageEntity from './recipe-images.entity';
import { RecipeStatus } from '../enum/RECIPE.status.enum';
import RecipeIngredientsEntity from './recipe-ingredients.entity';

@Entity({ name: 'TB_RECIPES', schema: process.env.DATABASE_SCHEMA })
class RecipeEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: string;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'PREPARATION_TIME', default: 0 })
  preparationTime: number;

  @Column({ name: 'RECIPE_DE' })
  description: string;

  @Column({ name: 'STATUS', enum: RecipeStatus, default: RecipeStatus.Public })
  status: RecipeStatus;

  @ManyToOne(() => RecipeCategoryEntity, { nullable: true, eager: true, cascade: true })
  category: RecipeCategoryEntity;

  @OneToMany(() => RecipeImageEntity, (recipe) => recipe.recipe, { nullable: true, eager: true, cascade: true })
  images: RecipeImageEntity[];

  @OneToMany(() => RecipeInstructionsEntity, (recipe) => recipe.recipe, { nullable: true, eager: true, cascade: true })
  instructions: RecipeInstructionsEntity[];
  
  @OneToMany(() => RecipeIngredientsEntity, (recipe) => recipe.recipe, { nullable: true, eager: true, cascade: true })
  ingredients: RecipeIngredientsEntity[];

  @CreateDateColumn({ name: 'CREATED_AT' })
  createAt!: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt!: Date;
}

export default RecipeEntity;
