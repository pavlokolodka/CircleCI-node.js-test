import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import OrderRepository from 'src/volunteer/repository/order.repository';

@Module({
  providers: [VolunteerService, PrismaService, JwtService, OrderRepository],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
