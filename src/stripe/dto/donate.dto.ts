import { ApiProperty } from '@nestjs/swagger';

export class DonateDto {
  @ApiProperty({
    example: 250,
    description: 'Amount of donate',
    type: Number,
  })
  amount: number;

  @ApiProperty({
    example: 'usd',
    description: 'Currency of donate',
    type: String,
  })
  currency: string;

  @ApiProperty({
    example: 'For emergency car',
    description: 'Title of order',
    type: String,
  })
  description: string;
}
