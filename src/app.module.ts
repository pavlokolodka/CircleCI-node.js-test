import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { PasswordModule } from './password/password.module';
import { JwtModule } from '@nestjs/jwt';
import { RecaptchaMiddleware } from './middlewares/recaptcha.middleware';
import { RecaptchaService } from './utils/recaptcha';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    PasswordModule,
    VolunteerModule,
    JwtModule,
    HttpModule
  ],
  providers: [RecaptchaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RecaptchaMiddleware).forRoutes(
      { path: 'password/forgot', method: RequestMethod.POST },
      { path: 'password/reset', method: RequestMethod.PATCH },
      { path: 'auth/sign-up', method: RequestMethod.POST },
      { path: 'auth/sign-in', method: RequestMethod.POST })
  }
}