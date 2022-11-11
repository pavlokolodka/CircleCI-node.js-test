import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'User email',
    uniqueItems: true,
    type: String
  })
  email: string;

  @ApiProperty({
    example: 'Name',
    description: 'User name',
    type: String
  })
  name: string;

  @ApiProperty({
    example: 'Lastname',
    description: 'User lastname',
    type: String
  })
  lastname: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'User password',
    type: String
  })
  password: string;

  @ApiProperty({
    example: 'https://www.google.com/photo.png',
    description: 'User photo',
    required: false,
    type: String
  })
  photo?: string;

  @ApiProperty({
    description: 'Recaptcha token',
    type: String
  })
  recaptchaToken: string
}
