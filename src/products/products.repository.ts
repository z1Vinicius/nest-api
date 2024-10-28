import { Injectable } from '@nestjs/common';

@Injectable()
class ProductRepository {
  private products = [];

  public create(product) {
    this.products.push(product);
  }

  public listProducts() {
    return this.products;
  }
}

export default ProductRepository;
