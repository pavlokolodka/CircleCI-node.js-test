import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) { }

  @Post('forgot')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(forgotPasswordDto)
  }

  @Patch('reset')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto)
  }

  @Patch('update')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.updatePassword(updatePasswordDto)
  }
}
