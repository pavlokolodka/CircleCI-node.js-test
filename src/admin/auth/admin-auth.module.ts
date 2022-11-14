import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { AdminService } from '../services/admin.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';

@Module({
  imports: [],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, PrismaService, AdminService],
})
export class AdminAuthModule {}
