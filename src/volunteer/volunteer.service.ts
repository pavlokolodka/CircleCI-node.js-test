import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class VolunteerService {
  constructor(private prismaService: PrismaService) {}

  async getAllOrders(limit: number, sort, page: number, search: string) {
    const skip = limit * (page - 1);
    const orders = await this.prismaService.order.findMany({
      skip,
      take: limit,
      orderBy: {
        id: sort,
      },
      where: {
        title: {
          contains: search,
        },
      },
    });
    const totalPages = Math.round(
      (await this.prismaService.order.findMany()).length / limit,
    );
    return {
      page,
      limit,
      totalPages,
      data: orders,
    };
  }

  async getOrderById(id: number) {
    return this.prismaService.order.findFirst({
      where: {
        id,
      },
    });
  }

  async createOrder(order: CreateOrderDto) {
    return this.prismaService.order.create({
      data: {
        title: order.title,
        info: order.info,
        user_id: order.id,
      },
    });
  }

  async updateOrder(order: UpdateOrderDto, id: number) {
    return this.prismaService.order.update({
      where: { id },
      data: {
        title: order.title,
        info: order.info,
      },
    });
  }
}
