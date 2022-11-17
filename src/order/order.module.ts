import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import OrderRepository from 'src/order/repository/order.repository';
import { AwsService } from '../services/aws.service';

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
