import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserUpdateController } from './user.update.controller';
import { UserUpdateService } from './user.update.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [UserController, UserUpdateController],
  providers: [UserService, UserUpdateService, PrismaService]
})
export class UserModule { }
