import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Req() req: Express.Request, @Body() orderData: CreateOrderDto) {
    const userId = req.user.sub;
    return await this.ordersService.create(userId, orderData);
  }

  @Get()
  findAll(@Req() req: Express.Request) {
    const userId = req.user.sub;
    return this.ordersService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status/')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderStatusDto,
    @Req() req: Express.Request,
  ) {
    const userId = req.user.sub;
    return await this.ordersService.updateOrderStatus(id, userId, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
