import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { VolunteerController } from './volunteer.controller';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import OrderRepository from 'src/order/repository/order.repository';

@Module({
  providers: [OrderService, PrismaService, JwtService, OrderRepository],
  controllers: [VolunteerController],
})
export class OrderModule {}
