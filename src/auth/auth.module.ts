import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { RecaptchaService } from 'src/utils/recaptcha';

@Module({
  imports: [HttpModule, JwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, RecaptchaService],
})
export class AuthModule { }
