import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // return this.productRepository.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.productRepository.remove(+id);
  }
}
