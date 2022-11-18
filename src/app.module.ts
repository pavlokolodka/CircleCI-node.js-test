import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { AdminPassModule } from './admin/admin-password/admin-pass.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { PasswordModule } from './password/password.module';
import { JwtModule } from '@nestjs/jwt';
import { VolunteerRequestModule } from './admin/volunteer-requests/volunteer-request.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UserModule,
    AuthModule,
    AdminAuthModule,
    AdminPassModule,
    PasswordModule,
    VolunteerModule,
    JwtModule,
    VolunteerRequestModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: { user: 'apikey', pass: process.env.MAIL_PASSWORD },
      },
    }),
  ],
  controllers: [],
})
export class AppModule {}
