import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import ProductEntity from './../../modules/products/entities/product.entity';
import UserEntity from './../../modules/users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
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
    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }
    const productsIds = orderData.orderItems.map((item) => item.product);
    const productsRelated = await this.productRepository.findBy({ id: In(productsIds) });
    const ordemItems = orderData.orderItems.map((product) => {
      const relatedProduct = productsRelated.find((relatedProduct) => product.product === relatedProduct.id);
      if (!relatedProduct) {
        throw new NotFoundException('Produto não existe');
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

  async updateOrderStatus(id: string, updateOrderDto: UpdateOrderStatusDto) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Pedido não existe');
    }
    order.status = updateOrderDto.orderStatus;
    await this.orderRepository.save(order);
    return order;
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Pedido não existe');
    }
    await this.orderRepository.remove(order);
  }
}
