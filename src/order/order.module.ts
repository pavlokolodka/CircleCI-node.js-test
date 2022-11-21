import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import OrderRepository from 'src/order/repository/order.repository';
import { AwsService } from '../services/aws.service';
import { AuthHandleService } from 'src/services/auth.handle.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [
    OrderService,
    PrismaService,
    JwtService,
    OrderRepository,
    AwsService,
    AuthHandleService
  ],
  imports: [UserModule],
  controllers: [OrderController],
})
export class OrderModule { }
