import { ApiProperty } from '@nestjs/swagger';

export class ApproveRequestDto {
  @ApiProperty({
    example: 1,
    description: 'user Id',
    type: Number,
  })
  userId: number;

  @ApiProperty({
    example: 'true or false',
    description: 'status of request',
    type: Boolean,
  })
  status: boolean;

  @ApiProperty({
    example: 'Reject',
    description: 'message with reason for rejection',
    type: String,
  })
  message: string;
}
