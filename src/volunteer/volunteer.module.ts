import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [VolunteerService, PrismaService, JwtService],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
