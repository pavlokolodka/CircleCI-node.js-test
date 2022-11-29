import { Controller, Post, Res, Body, UsePipes } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { LoginAdminSchema } from 'src/utils/validator/admin/loginAdmin.schema';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('sign-in')
  @UsePipes(new AjvValidationPipe(LoginAdminSchema))
  async loginAdmin(@Body() adminPayload: LoginAdminDto, @Res() res: Response) {
    const token = await this.adminAuthService.loginAdmin(adminPayload);
    res.send({ message: 'success', token });
  }
}
