import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RecipeCategoryEntity from './entities/recipe-category.entity';
import RecipeImageEntity from './entities/recipe-images.entity';
import RecipeEntity from './entities/recipe.entity';
import RecipeService from './recipe.service';
import { RecipeController } from './recipe.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeEntity, RecipeCategoryEntity, RecipeImageEntity, RecipeCategoryEntity]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
class RecipeModule {}

export default RecipeModule;
