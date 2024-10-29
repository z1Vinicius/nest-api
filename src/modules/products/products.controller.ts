import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductEntity from './entities/product.entity';
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
    const product = new ProductEntity();
    product.name = productData.name;
    product.price = productData.price;
    product.active = true;
    product.description = productData.description;
    product.images = productData.images;
    product.details = productData.details;
    product.category = productData.category;
    console.table(product);
    return await this.productRepository.createProduct(product);
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
