import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ListRecipesDTO } from './dto/list-recipes.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductEntity from './entities/recipe.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import RecipeEntity from './entities/recipe.entity';

@Injectable()
class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly recipeRepository: Repository<ProductEntity>,
  ) {}

  async listRecipes(): Promise<ListRecipesDTO[]> {
    const recipeQuery = await this.recipeRepository.find();
    
    const recipes = recipeQuery.map((recipe) => {
      return new ListRecipesDTO(
        recipe.id,
        recipe.title,
        recipe.description,
        recipe.status,
        recipe.servingSize,
        recipe.preparationTime,
        recipe.category,
        recipe.images,
        recipe.ingredients,
        recipe.instructions,
      );
    });
    return recipes;
  }

  // async findProduct(id: string): Promise<ListProductsDTO> {
  //   return this.productRepository.findOneByOrFail({ id: id });
  // }

  async createRecipe(recipeData: CreateRecipeDto) {
    const recipe = new RecipeEntity();
    Object.assign(recipe, recipeData as RecipeEntity);

    return await this.recipeRepository.save(recipe);
  }

  // async updateProduct(productId: string, productData: UpdateProductDto) {
  //   const product = await this.productRepository.findOneBy({ id: productId });
  //   if (!product) {
  //     throw new NotFoundException('Produto não existe');
  //   }
  //   Object.entries(productData).forEach(([key, value]) => {
  //     if (key === 'id') return;
  //     product[key] = value;
  //   });
  //   return await this.productRepository.save(product);
  // }

  // async deleteProduct(id: string) {
  //   return await this.productRepository.delete(id);
  // }
}

export default ProductService;
