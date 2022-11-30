import { Module } from '@nestjs/common';
import { HintPhotoController } from './hint_photo.controller';
import { HintPhotoService } from './hint_photo.service';
import { HintPhotoRepository } from './repository/hint-photo.repository';
import { UserModule } from '../user/user.module';
import { AuthHandleService, AwsService, PrismaService } from '../services';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [HintPhotoController],
  providers: [
    HintPhotoService,
    HintPhotoRepository,
    PrismaService,
    AuthHandleService,
    JwtService,
    AwsService,
  ],
  exports: [HintPhotoService, HintPhotoRepository],
  imports: [UserModule],
})
export class VolunteerHintPhotoModule {}
