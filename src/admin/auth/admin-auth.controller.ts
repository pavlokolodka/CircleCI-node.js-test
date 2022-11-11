import { Controller, Post, Res, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('sign-in')
  async loginAdmin(@Body() adminPayload: LoginAdminDto, @Res() res) {
    const token = await this.adminAuthService.loginAdmin(adminPayload);
    res.send({ message: 'success', token });
  }
}
