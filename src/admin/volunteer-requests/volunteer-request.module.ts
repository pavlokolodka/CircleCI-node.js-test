import { Module } from '@nestjs/common';
import { VolunteerRequestsService } from './volunteer-requests.service';
import { VolunteerRequestsController } from './volunteer-requests.controller';
import { PrismaService } from '../../services/prisma.service';
import VolunteerRequestsRepository from './repository/volunteer-requests.repository';
import UserRepository from '../../user/repository/user.repository';
import { UserService } from '../../user/user.service';
import { AwsService } from '../../services/aws.service';

@Module({
  imports: [],
  controllers: [VolunteerRequestsController],
  providers: [
    VolunteerRequestsService,
    PrismaService,
    VolunteerRequestsRepository,
    UserRepository,
    UserService,
    AwsService,
  ],
})
export class VolunteerRequestModule {}
