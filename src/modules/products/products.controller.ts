import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductService from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productRepository: ProductService) {}

  @Get()
  async findAll() {
    return await this.productRepository.listProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRepository.listProducts();
  }

  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    return await this.productRepository.createProduct(productData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // return this.productRepository.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productRepository.deleteProduct(id);
  }
}
