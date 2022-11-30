import { Module } from '@nestjs/common';
import { HintController } from './hint.controller';
import { HintService } from './hint.service';
import { AuthHandleService, PrismaService } from '../services';
import { UserModule } from '../user/user.module';
import HintRepository from './repository/hint.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [HintController],
  providers: [
    HintService,
    PrismaService,
    HintRepository,
    AuthHandleService,
    JwtService,
  ],
  imports: [UserModule],
  exports: [HintService, HintRepository],
})
export class HintModule {}
