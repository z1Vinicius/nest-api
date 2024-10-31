import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductCategoryEntity from './entities/product-category.entity';
import ProductImageEntity from './entities/product-images.entity';
import ProductEntity from './entities/product.entity';
import ProductService from './product.service';
import { ProductsController } from './products.controller';
import ProductRepository from './products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductCategoryEntity, ProductImageEntity, ProductCategoryEntity]),
  ],
  controllers: [ProductsController],
  providers: [ProductRepository, ProductService],
})
class ProductsModule {}

export default ProductsModule;
