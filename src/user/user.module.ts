import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/services/prisma.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import UserRepository from './repository/user.repository';
import { AuthHandleService } from '../services/auth.handle.service';
import { AwsService } from 'src/services/aws.service';

@Module({
  controllers: [UserController],
  exports: [UserService, UserRepository],
  providers: [
    UserService,
    PrismaService,
    JwtService,
    RolesGuard,
    UserRepository,
    AuthHandleService,
    AwsService
  ],
})
export class UserModule { }
