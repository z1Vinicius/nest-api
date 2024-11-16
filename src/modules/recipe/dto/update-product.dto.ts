import { Injectable } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';

Injectable();
export class UpdateProductDto extends PartialType(CreateRecipeDto) {}
