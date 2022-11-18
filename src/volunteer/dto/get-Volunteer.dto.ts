import { ApiProperty } from '@nestjs/swagger';

export class GetVolunteerDto {
  @ApiProperty({
    example: 'Ukraine',
    description: 'country,where you from',
    type: String,
  })
  country: string;

  @ApiProperty({
    example: 'Lviv',
    description: 'city where you live',
    type: String,
  })
  city: string;

  @ApiProperty({
    example: '1234 5678 1234 5678',
    description: 'your card',
    type: String,
  })
  card_number: string;

  @ApiProperty({
    example: 'passport photo',
    description: 'passport photo',
    type: String,
  })
  document: string;

  @ApiProperty({
    example: 'pdf',
    description: 'expansion of document',
    type: String,
  })
  expansion: string;

  @ApiProperty({
    example: 1,
    description: 'your id',
    type: Number,
  })
  userId: number;
}
