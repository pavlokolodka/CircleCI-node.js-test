import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import {
  CreateOrderSchema,
  UpdateOrderSchema,
} from 'src/utils/validator/volunteer';
import { getAllOrdersSchema } from 'src/utils/validator/volunteer/allOrders.schema';
import { AllOrdersDto } from 'src/utils/validator/dto/allOrders.dto';

@Controller('orders')
export class VolunteerController {
  constructor(private volunteerService: VolunteerService) {}

  @Get()
  @UsePipes(new AjvValidationPipe(getAllOrdersSchema))
  async getAllOrders(@Query() params: AllOrdersDto) {
    const { page, limit, sort, search } = params;
    return this.volunteerService.getAllOrders(+limit, sort, +page, search);
  }

  @Get('/:id')
  async getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.volunteerService.getOrderById(id);
  }

  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Post()
  @UsePipes(new AjvValidationPipe(CreateOrderSchema))
  async createOrder(@Body() order: CreateOrderDto) {
    return this.volunteerService.createOrder(order);
  }

  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Patch('/:id')
  @UsePipes()
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body(new AjvValidationPipe(UpdateOrderSchema)) order: UpdateOrderDto,
  ) {
    return this.volunteerService.updateOrder(order, id);
  }
}
