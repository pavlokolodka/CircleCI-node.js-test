import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from './../services/prisma.service';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { RecaptchaService } from 'src/utils/recaptcha';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService, PrismaService, RecaptchaService],
  imports: [HttpModule],
})
export class PasswordModule {}
