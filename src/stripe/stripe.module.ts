import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { PrismaService } from '../services';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [StripeController],
  providers: [StripeService, PrismaService],
  imports: [OrderModule],
})
export class StripeModule {}
