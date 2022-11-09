import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    VolunteerModule,
    PasswordModule
  ],
  controllers: [],
})
export class AppModule { }
