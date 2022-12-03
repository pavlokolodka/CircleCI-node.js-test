import { ApiProperty } from '@nestjs/swagger';

export class CreateHintPhotoDto {
  @ApiProperty({
    example: 'New features text',
    description: 'text of hint',
    type: String,
  })
  text: string;

  @ApiProperty({
    type: String,
  })
  photo: string;

  @ApiProperty({
    example: 1,
    description: 'Hint Id',
    type: Number,
  })
  hintId: number;
}
