import { Injectable } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

Injectable();
export class UpdateProductDto extends PartialType(CreateProductDto) {}
