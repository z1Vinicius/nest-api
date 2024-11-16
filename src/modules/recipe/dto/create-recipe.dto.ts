import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import RecipeEntity from '../entities/recipe.entity';
import { RecipeStatus } from '../enum/RECIPE.status.enum';

export class RecipeInstructionsDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  recipe: RecipeEntity;
}

export class RecipeImageDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  recipe: RecipeEntity;
}

export class RecipeCategoryDTO {
  @IsNumber()
  @IsOptional()
  id!: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class RecipeIngredientsDTO {
  @IsNumber()
  @IsOptional()
  id!: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  unit: string;
  
  @IsNumber()
  @IsNotEmpty()
  count: number;
}

Injectable();
export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  preparationTime: number;
  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: RecipeStatus;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RecipeCategoryDTO)
  category: RecipeCategoryDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RecipeInstructionsDTO)
  instructions: RecipeInstructionsDTO[];
  
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientsDTO)
  ingredients: RecipeIngredientsDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RecipeImageDTO)
  images: RecipeImageDTO[];
}
