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
import { VolunteerService } from './volunteer.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('orders')
export class VolunteerController {
  constructor(private volunteerService: VolunteerService) {}

  @Get()
  async getAllOrders(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'asc',
    @Query('search') search: string,
  ) {
    try {
      return this.volunteerService.getAllOrders(+limit, sort, +page, search);
    } catch (e) {
      throw e;
    }
  }

  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    try {
      return this.volunteerService.getOrderById(id);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    try {
      return this.volunteerService.createOrder(order);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Patch('/:id')
  async updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    try {
      return this.volunteerService.updateOrder(order, id);
    } catch (e) {
      throw e;
    }
  }
}
