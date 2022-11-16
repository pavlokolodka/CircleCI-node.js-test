import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { AdminPassModule } from './admin/admin-password/admin-pass.module';
import { PasswordModule } from './password/password.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UserModule,
    AuthModule,
    AdminAuthModule,
    AdminPassModule,
    PasswordModule,
    OrderModule,
    JwtModule,
  ],
  controllers: [],
})
export class AppModule {}
