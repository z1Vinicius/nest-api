import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
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
        product.available,
        product.active,
        product.category,
        product.images,
        product.details,
      );
    });
    return products;
  }

  async createProduct(productData: CreateProductDto) {
    const product = new ProductEntity();
    product.name = productData.name;
    product.price = productData.price;
    product.active = true;
    product.description = productData.description;
    product.images = productData.images;
    product.details = productData.details;
    product.category = productData.category;
    product.available = productData.available;
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
