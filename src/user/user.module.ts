import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { UserUpdateController } from './user.update.controller';
import { UserUpdateService } from './user.update.service';
import { FileManagerModule } from 'src/file-manager/file-manager.module';

@Module({
  controllers: [UserController, UserUpdateController],
  providers: [UserService, UserUpdateService, PrismaService],
  imports: [FileManagerModule]
})
export class UserModule { }
