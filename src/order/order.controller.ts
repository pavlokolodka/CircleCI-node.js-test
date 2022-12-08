import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthHandleService } from 'src/services';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import {
  CreateOrderSchema,
  UpdateOrderSchema,
  getAllOrdersSchema,
  IdSchema,
} from 'src/utils/validator/order';
import { AllOrdersDto } from 'src/utils/validator/dto/allOrders.dto';
import { IdDto } from 'src/utils/validator/dto/id.dto';
import { SortOrdersDto } from 'src/utils/validator/dto/sortOrders.dto';
import { getSortedOrdersSchema } from 'src/utils/validator/order/sortedOrders.schema';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private readonly authHandleService: AuthHandleService,
  ) {}

  @ApiResponse({ status: 200, description: 'Get all Orders from DB' })
  @Get()
  @UsePipes(new AjvValidationPipe(getAllOrdersSchema))
  async getAllOrders(@Query() params: AllOrdersDto) {
    const { limit = 10, sort = 'asc', page = 1, search } = params;
    return this.orderService.getAllOrders(+limit, sort, +page, search);
  }

  @ApiResponse({ status: 200, description: 'Get all Orders sorted from DB' })
  @Get('sorted')
  @UsePipes(new AjvValidationPipe(getSortedOrdersSchema))
  async getSortOrders(@Query() params: SortOrdersDto) {
    const { page = 1, limit = 10, sort = 'asc', sortBy } = params;
    return this.orderService.getSortOrders(+limit, sort, +page, sortBy);
  }

  @ApiResponse({ status: 200, description: 'Get full information about order' })
  @Get('/:id')
  @UsePipes(new AjvValidationPipe(IdSchema))
  async getOrderById(@Param() idParam: IdDto) {
    const { id } = idParam;
    return this.orderService.getOrderById(+id);
  }

  @ApiResponse({ status: 201, description: 'Order was created' })
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Post()
  @UsePipes(new AjvValidationPipe(CreateOrderSchema))
  async createOrder(@Req() req, @Body() order: CreateOrderDto) {
    const { email } = this.authHandleService.getPayload(
      req.headers['authorization'],
    );
    return this.orderService.createOrder(order, email);
  }

  @ApiResponse({ status: 204, description: 'Order was updated' })
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @Patch('/:id')
  @UsePipes()
  async updateOrder(
    @Param(new AjvValidationPipe(IdSchema)) idNum: IdDto,
    @Body(new AjvValidationPipe(UpdateOrderSchema)) order: UpdateOrderDto,
  ) {
    const { id } = idNum;
    return this.orderService.updateOrder(order, +id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get full information about order by userId',
  })
  @Get('/:id/ownership')
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @UsePipes(new AjvValidationPipe(IdSchema))
  async getUserOrder(@Param() param: IdDto, @Req() req) {
    const { email } = this.authHandleService.getPayload(
      req.headers['authorization'],
    );
    const { id } = param;
    return this.orderService.getUserOrder(+id, email);
  }
}
