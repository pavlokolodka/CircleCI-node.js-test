import { Injectable } from '@nestjs/common';
import OrderRepository from 'src/order/repository/order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async getAllOrders(limit: number, sort, page: number, search: string) {
    const orders = await this.orderRepository.getAllOrders(
      limit,
      sort,
      page,
      search,
    );
    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.getOrderById(id);
    return order;
  }

  async createOrder(order: CreateOrderDto) {
    const newOrder = await this.orderRepository.createOrder(order);
    return newOrder;
  }

  async updateOrder(order: UpdateOrderDto, id: number) {
    const updatedOrder = await this.orderRepository.updateOrder(order, id);
    return updatedOrder;
  }
}
