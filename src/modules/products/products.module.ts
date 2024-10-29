import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import ProductRepository from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductRepository],
})
class ProductsModule {}

export default ProductsModule;
