import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AjvValidationPipe } from '../utils/validator/validation';
import { DonateSchema } from '../utils/validator/stripe/donate.schema';
import { DonateDto } from '../utils/validator/dto/donate.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateSumSchema } from '../utils/validator/stripe/update-sum.schema';
import { UpdateSumDto } from './dto/update-sum.dto';

@ApiTags('Stripe')
@Controller('payment')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ status: 201, description: 'Donate was made' })
  @Post()
  @UsePipes(new AjvValidationPipe(DonateSchema))
  async createDonate(@Body() donate: DonateDto) {
    return this.stripeService.createDonate(donate);
  }

  @Post('/status')
  @UsePipes(new AjvValidationPipe(UpdateSumSchema))
  async updateSumInDb(@Body() data: UpdateSumDto) {
    return this.stripeService.updateSumInDb(data);
  }
}
