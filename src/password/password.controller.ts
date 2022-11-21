import { Body, Controller, Patch, Post, UsePipes } from '@nestjs/common';
import {
  ResetPasswordSchema,
  UpdatePasswordSchema,
} from 'src/utils/validator/password';
import { EmailSchema } from 'src/utils/validator/password/email.schema';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { EmailDto } from './dto/email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot')
  @UsePipes(new AjvValidationPipe(EmailSchema))
  forgotPassword(@Body() emailPayload: EmailDto) {
    return this.passwordService.forgotPassword(emailPayload.email);
  }

  @Patch('reset')
  @UsePipes(new AjvValidationPipe(ResetPasswordSchema))
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto);
  }

  @Patch('update')
  @UsePipes(new AjvValidationPipe(UpdatePasswordSchema))
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.updatePassword(updatePasswordDto);
  }
}
