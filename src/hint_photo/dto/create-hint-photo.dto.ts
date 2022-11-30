import { ApiProperty } from '@nestjs/swagger';

export class CreateHintPhotoDto {
  @ApiProperty({
    example: 'New features',
    description: 'Title of hint photo',
    type: String,
  })
  title: string;

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
