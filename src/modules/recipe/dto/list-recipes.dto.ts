import { Injectable } from '@nestjs/common';

@Injectable()
class RecipeInstruction{
  readonly id: number;
  readonly description: string;
}

@Injectable()
class RecipeImage {
  readonly id: number;
  readonly url: string;
  readonly description: string;
}

@Injectable()
class RecipeCategory {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}

@Injectable()
class RecipeIngredients {
  readonly id: number;
  readonly name: string;
  readonly unit: string;
  readonly count: number;
}

Injectable();
class ListRecipesDTO {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly status: string,
    readonly servingSize: number,
    readonly preparationTime: number,
    readonly category: RecipeCategory,
    readonly images: RecipeImage[],
    readonly ingredients: RecipeIngredients[],
    readonly instructions: RecipeInstruction[],
  ) {}
}

export { ListRecipesDTO };
