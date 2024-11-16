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

  @Column({  nullable: false })
  title: string;

  @Column({ default: 0  })
  preparationTime: number;
  
  @Column({ default: 0 })
  servingSize: number;

  @Column()
  description: string;

  @Column({enum: RecipeStatus, default: RecipeStatus.Public })
  status: RecipeStatus;

  @Column((type) => RecipeCategoryEntity)
  category: RecipeCategoryEntity;

  @Column((type) => RecipeImageEntity)
  images: RecipeImageEntity[];

  @Column((type) => RecipeInstructionsEntity)
  instructions: RecipeInstructionsEntity[];
  
  @Column((type) => RecipeIngredientsEntity)
  ingredients: RecipeIngredientsEntity[];

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}

export default RecipeEntity;
