import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('orders')
export class OrderController {
  constructor(private volunteerService: OrderService) {}

  @Get()
  async getAllOrders(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'asc',
    @Query('search') search: string,
  ) {
    return this.volunteerService.getAllOrders(+limit, sort, +page, search);
  }

  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    return this.volunteerService.getOrderById(+id);
  }

  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    return this.volunteerService.createOrder(order);
  }

  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Patch('/:id')
  async updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return this.volunteerService.updateOrder(order, +id);
  }
}
