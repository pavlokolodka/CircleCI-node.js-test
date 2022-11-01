import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { UserUpdateController } from './user.update.controller';

@Module({
  controllers: [UserController, UserUpdateController],
  providers: [UserService, PrismaService]
})
export class UserModule { }
