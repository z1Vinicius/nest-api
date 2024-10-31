import ProductEntity from '@modules/products/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import OrderItemEntity from './entities/order-item.entity';
import OrderEntity from './entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity) private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(orderItemData: CreateOrderItemDto): Promise<OrderItemEntity> {
    const order = await this.orderRepository.findOneBy({ id: orderItemData.order });
    if (!order) {
      throw new Error('Pedido não existe');
    }
    const product = await this.productRepository.findOneBy({ id: orderItemData.product });
    if (!product) {
      throw new Error('Item não existe ou desativado');
    }
    const ordemItemExist = this.orderItemRepository.findOneBy({ order: order, product: product });
    if (ordemItemExist) {
      throw new Error('Item do pedido já cadastrado');
    }
    const orderItem = new OrderItemEntity(order, product, orderItemData.quantity);
    await this.orderItemRepository.save(orderItem);
    return orderItem;
  }

  async findAll() {
    return await this.orderItemRepository.find();
  }

  async findOne(id: string) {
    return await this.orderItemRepository.findOneBy({ id: id });
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.findOne(id);
    if (!orderItem) {
      throw new Error('Item do pedido não existe');
    }
    orderItem.quantity = updateOrderItemDto.quantity;
    this.orderItemRepository.save(orderItem);
    return orderItem;
  }

  async remove(id: string) {
    const orderItem = await this.findOne(id);
    if (!orderItem) {
      throw new Error('Item do pedido não existe');
    }
    await this.orderItemRepository.delete(orderItem);
  }
}
