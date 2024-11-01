import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductsDTO } from './dto/list-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
    return await this.productRepository.save(product);
  }

  async updateProduct(productId: string, productData: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Produto não existe');
    }
    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'id') return;
      product[key] = value;
    });
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
