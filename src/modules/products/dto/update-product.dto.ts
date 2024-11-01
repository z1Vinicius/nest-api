import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProductCategoryDTO, ProductDetailDTO, ProductImageDTO } from './create-product.dto';

Injectable();
export class UpdateProductDto {
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
