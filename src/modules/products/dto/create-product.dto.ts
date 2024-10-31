import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import ProductEntity from '../entities/product.entity';

class ProductDetailDTO {
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}

class ProductImageDTO {
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}

class ProductCategoryDTO {
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

Injectable();
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  available: number;

  @IsNumber()
  @IsNotEmpty()
  isAvailable: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductCategoryDTO)
  category: ProductCategoryDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDTO)
  details: ProductDetailDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];
}

export default CreateProductDto;
