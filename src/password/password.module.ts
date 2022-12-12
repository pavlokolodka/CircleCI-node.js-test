import { Module } from '@nestjs/common';
import { PrismaService } from '../services';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService, PrismaService],
})
export class PasswordModule {}
