import { HttpModule } from '@nestjs/axios';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { AdminPassModule } from './admin/admin-password/admin-pass.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { PasswordModule } from './password/password.module';
import { JwtModule } from '@nestjs/jwt';
import { RecaptchaMiddleware } from './middlewares/recaptcha.middleware';
import { RecaptchaService } from './utils/recaptcha';
import { VolunteerRequestModule } from './admin/volunteer-requests/volunteer-request.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { OrderModule } from './order/order.module';
import { HintModule } from './hint/hint.module';
import { VolunteerHintPhotoModule } from './hint_photo/hint_photo.module';

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
    HttpModule,
    OrderModule,
    VolunteerRequestModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: { user: 'apikey', pass: process.env.MAIL_PASSWORD },
      },
    }),
    HintModule,
    VolunteerHintPhotoModule,
  ],
  providers: [RecaptchaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RecaptchaMiddleware)
      .forRoutes(
        { path: 'password/forgot', method: RequestMethod.POST },
        { path: 'password/reset', method: RequestMethod.PATCH },
        { path: 'auth/sign-up', method: RequestMethod.POST },
        { path: 'auth/sign-in', method: RequestMethod.POST },
      );
  }
}
