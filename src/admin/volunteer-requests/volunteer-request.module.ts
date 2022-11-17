import { Module } from '@nestjs/common';
import { VolunteerRequestsService } from './volunteer-requests.service';
import { VolunteerRequestsController } from './volunteer-requests.controller';
import { PrismaService } from '../../services/prisma.service';
import VolunteerRequestsRepository from './repository/volunteer-requests.repository';

@Module({
  imports: [],
  controllers: [VolunteerRequestsController],
  providers: [
    VolunteerRequestsService,
    PrismaService,
    VolunteerRequestsRepository,
  ],
})
export class VolunteerRequestModule {}
