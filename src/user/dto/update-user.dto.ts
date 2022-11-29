import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Name',
    description: 'User name',
    type: String,
    nullable: true,
  })
  name?: string;

  @ApiProperty({
    example: 'Lastname',
    description: 'User lastname',
    type: String,
    nullable: true,
  })
  lastname?: string;

  @ApiProperty({
    description: 'Image converted to base64',
    type: String,
    nullable: true,
  })
  image?: string;
}
