import { CACHE_MANAGER, CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductEntity from './entities/product.entity';
import ProductService from './product.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productRepository: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5)
  async findAll() {
    return await this.productRepository.listProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cacheKey = `product-find-${id}`;
    const cache = await this.cacheManager.get<ProductEntity>(cacheKey);
    if (cache) return cache;
    const product = await this.productRepository.findProduct(id);
    await this.cacheManager.set(cacheKey, product, 5);
    return product;
  }

  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    return await this.productRepository.createProduct(productData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productRepository.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productRepository.deleteProduct(id);
  }
}
