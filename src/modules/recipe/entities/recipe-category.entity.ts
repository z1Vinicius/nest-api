import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import RecipeEntity from './recipe.entity';
import { ObjectId } from 'mongodb';

@Entity({name: "RECIPE_CATEGORY"})
class RecipeCategoryEntity extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;
  
  @ManyToOne(() => RecipeEntity, (recipe) => recipe.categories, {
    orphanedRowAction: 'delete',
    cascade: true,
  })
  recipe: RecipeEntity;
}

export default RecipeCategoryEntity;
