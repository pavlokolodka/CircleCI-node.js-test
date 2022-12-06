import { ApiProperty } from '@nestjs/swagger';

export class UpdateHintDto {
  @ApiProperty({
    example: 'New features',
    description: 'Title of hint',
    type: String,
  })
  title: string;

  @ApiProperty({
    example: 'New features info',
    description: 'Info of hint',
    type: String,
  })
  info: string;

  @ApiProperty({
    example: 'Image',
    description: 'Some images',
    type: String,
  })
  photos: string[];
}
