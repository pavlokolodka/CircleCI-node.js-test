import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'refresh jwt token',
  })
  refreshToken: string;
}
