import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 1,
    description: 'User id',
    type: Number,
  })
  userId: number;

  @ApiProperty({
    example: 'Name',
    description: 'User name',
    type: String,
    nullable: true
  })
  name?: string;

  @ApiProperty({
    example: 'Lastname',
    description: 'User lastname',
    type: String,
    nullable: true
  })
  lastname?: string;

  @ApiProperty({
    description: 'Image converted to base64',
    type: String,
    nullable: true
  })
  imgBase64?: string;
}
