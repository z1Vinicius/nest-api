import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductRepository from './products.repository';

@Controller('products')
export class ProductsController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productRepository.listProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRepository.listProducts();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // return this.productRepository.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.productRepository.remove(+id);
  }
}
