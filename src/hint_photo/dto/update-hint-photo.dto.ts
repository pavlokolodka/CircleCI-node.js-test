import { ApiProperty } from '@nestjs/swagger';

export class UpdateHintPhotoDto {
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
}
