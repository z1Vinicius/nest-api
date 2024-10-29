import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListProductsDTO } from './dto/list-products.dto';
import ProductEntity from './entities/product.entity';

@Injectable()
class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async listProducts(): Promise<ListProductsDTO[]> {
    const productsQuery = await this.productRepository.find();
    const products = productsQuery.map((product) => {
      return new ListProductsDTO(
        product.id,
        product.name,
        product.description,
        product.price,
        product.active,
        product.category,
        product.images,
        product.details,
      );
    });
    return products;
  }
}

export default ProductService;
