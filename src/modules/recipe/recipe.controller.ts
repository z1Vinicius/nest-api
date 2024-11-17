import { CACHE_MANAGER, CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateRecipeDto } from './dto/create-recipe.dto';
// import { UpdateRecipeDto } from './dto/update-recipe.dto';
import RecipeEntity from './entities/recipe.entity';
import RecipeService from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly RecipeRepository: RecipeService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(5)
  async findAll() {
    return await this.RecipeRepository.listRecipes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cacheKey = `Recipe-find-${id}`;
    const cache = await this.cacheManager.get(cacheKey);
    if (cache) return cache;
    const Recipe = await this.RecipeRepository.findRecipe(id);
    await this.cacheManager.set(cacheKey, Recipe, 5);
    return Recipe;
  }

  @Post()
  async createRecipe(@Body() RecipeData: CreateRecipeDto) {
    return await this.RecipeRepository.createRecipe(RecipeData);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
  //   return this.RecipeRepository.updateRecipe(id, updateRecipeDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.RecipeRepository.deleteRecipe(id);
  // }
}
