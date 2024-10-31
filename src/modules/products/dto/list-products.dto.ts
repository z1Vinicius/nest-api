import { Injectable } from '@nestjs/common';

@Injectable()
class ListProductCategory {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}

@Injectable()
class ListProductDetail {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}

@Injectable()
class ListImageDetail {
  readonly id: number;
  readonly url: string;
  readonly description: string;
}

Injectable();
class ListProductsDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly available: number,
    readonly active: boolean,
    readonly category: ListProductCategory,
    readonly images: ListImageDetail[],
    readonly details: ListProductDetail[],
  ) {}
}

export { ListProductCategory, ListProductsDTO };
