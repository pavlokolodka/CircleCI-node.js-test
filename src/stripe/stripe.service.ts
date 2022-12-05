import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { DonateDto } from '../utils/validator/dto/donate.dto';
import { PrismaService } from '../services';
import { OrderService } from '../order/order.service';
import { UpdateSumDto } from './dto/update-sum.dto';

@Injectable()
export class StripeService {
  private stripe;

  constructor(
    private prismaService: PrismaService,
    private orderService: OrderService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15',
    });
  }

  async createDonate(donate: DonateDto) {
    const orderFromDB = await this.orderService.getOrderById(donate.orderId);
    if (!orderFromDB) throw new BadRequestException('Order not found');

    return this.stripe.paymentIntents
      .create({
        amount: donate.amount * 100,
        currency: donate.currency,
        description: donate.description,
        payment_method_types: ['card'],
      })
      .catch(() => {
        throw new BadRequestException('Donate not made');
      });
  }

  async updateSumInDb(data: UpdateSumDto) {
    const orderFromDB = await this.orderService.getOrderById(data.orderId);
    if (!orderFromDB) throw new BadRequestException('Order not found');

    const sum = orderFromDB.sum + data.amount;
    return this.prismaService.order
      .update({
        where: { id: data.orderId },
        data: { sum },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }
}
