import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import ProductEntity from '../entities/product.entity';

export class ProductDetailDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}

export class ProductImageDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}

export class ProductCategoryDTO {
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
