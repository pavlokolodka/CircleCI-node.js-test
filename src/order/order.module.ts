import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import OrderRepository from 'src/order/repository/order.repository';

@Module({
  providers: [OrderService, PrismaService, JwtService, OrderRepository],
  controllers: [OrderController],
export class OrderModule {}
