import ProductEntity from '@modules/products/entities/product.entity';
import UserEntity from '@modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import OrderItemEntity from './entities/order-item.entity';
import OrderEntity from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(orderData: CreateOrderDto): Promise<OrderEntity> {
    const user = await this.userRepository.findOneBy({ id: orderData.user });
    const productsIds = orderData.orderItems.map((item) => item.product);
    const productsRelated = await this.productRepository.findBy({ id: In(productsIds) });
    const ordemItems = orderData.orderItems.map((product) => {
      const relatedProduct = productsRelated.find((relatedProduct) => product.product === relatedProduct.id);
      if (!relatedProduct) {
        throw new Error('Existem produtos não cadastrados');
      }
      const ordemItem = new OrderItemEntity(relatedProduct, product.quantity);
      return ordemItem;
    });
    const order = new OrderEntity(user);
    order.orderItems = ordemItems;
    await this.orderRepository.save(order);
    return order;
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: string) {
    return await this.orderRepository.findOneBy({ id: id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    if (!order) {
      throw new Error('Pedido não existe');
    }
    await this.orderRepository.remove(order);
  }
}
