import UserEntity from '@modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import OrderEntity from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(orderData: CreateOrderDto): Promise<OrderEntity> {
    const user = await this.userRepository.findOneBy({ id: orderData.user });
    const order = new OrderEntity(user);
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
