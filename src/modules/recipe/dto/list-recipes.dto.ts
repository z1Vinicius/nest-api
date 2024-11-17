import { Injectable } from '@nestjs/common';
import { ObjectId } from 'typeorm';

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
  readonly _id: ObjectId;
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
    readonly title: string,
    readonly description: string,
    readonly status: string,
    readonly calories: number,
    readonly categories: RecipeCategory[],
    readonly servingSize: number,
    readonly preparationTime: number,
    readonly images: RecipeImage[],
    readonly ingredients: RecipeIngredients[],
    readonly instructions: RecipeInstruction[],
    readonly id?: ObjectId,
  ) {}
}

export { ListRecipesDTO };
