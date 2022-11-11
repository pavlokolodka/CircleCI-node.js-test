import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private httpService: HttpService,
    private adminService: AdminService,
  ) {}

  async loginAdmin(adminPayload: LoginAdminDto) {
    const admin = await this.adminService.getAdminByEmail(adminPayload.email);
    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    const res = await this.httpService.axiosRef
      .post(`${process.env.ADMIN_AUTH_SERVICE_URL}/sign-in`, adminPayload)
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return res.data;
  }
}
