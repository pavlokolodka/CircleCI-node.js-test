import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { PrismaService } from '../services/prisma.service';
import VolunteerRepository from './repository/volunteer.repository';
import { AwsService } from '../services/aws.service';

@Module({
  providers: [VolunteerService, PrismaService, VolunteerRepository, AwsService],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
