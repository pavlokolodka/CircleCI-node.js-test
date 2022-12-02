import { ApiProperty } from '@nestjs/swagger';

export class UpdateSumDto {
  @ApiProperty({
    example: 1,
    description: 'Order id',
    type: Number,
  })
  orderId: number;

  @ApiProperty({
    example: 250,
    description: 'Amount of donate',
    type: Number,
  })
  amount: number;
}
