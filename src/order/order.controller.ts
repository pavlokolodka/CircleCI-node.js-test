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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiResponse({ status: 200, description: 'Get all Orders from DB' })
  @Get()
  async getAllOrders(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'asc',
    @Query('search') search: string,
  ) {
    return this.orderService.getAllOrders(+limit, sort, +page, search);
  }

  @ApiResponse({ status: 200, description: 'Get gull information about order' })
  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(+id);
  }

  @ApiResponse({ status: 201, description: 'Order was created' })
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.createOrder(order);
  }


  @ApiResponse({ status: 204, description: 'Order was updated' })
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Patch('/:id')
  async updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return this.orderService.updateOrder(order, +id);
  }
}
