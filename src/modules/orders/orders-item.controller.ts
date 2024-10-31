import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemService } from './order-item.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async create(@Body() orderItemData: CreateOrderItemDto) {
    return await this.orderItemService.create(orderItemData);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderItemService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderItemDto) {
    return await this.orderItemService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderItemService.remove(id);
  }
}
