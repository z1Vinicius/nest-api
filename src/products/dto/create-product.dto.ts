import { Injectable } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProductDetailDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

class ProductImageDTO {
  @IsString()
  @IsNotEmpty()
  url: string;

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
  isAvailable: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  createdAt: string;

  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  updatedAt: string;

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
