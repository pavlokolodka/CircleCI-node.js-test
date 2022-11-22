import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService, AwsService } from 'src/services';
import { JwtService } from '@nestjs/jwt';
import OrderRepository from 'src/order/repository/order.repository';

@Module({
  providers: [
    OrderService,
    PrismaService,
    JwtService,
    OrderRepository,
    AwsService,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
