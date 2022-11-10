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

  async loginAdmin(adminDto: LoginAdminDto) {
    const admin = await this.adminService.getAdminByEmail(adminDto.email);
    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    try {
      const res = await this.httpService.axiosRef.post(
        `${process.env.ADMIN_AUTH_SERVICE_URL}/sign-in`,
        adminDto,
      );
      return res.data;
    } catch (err) {
      throw new BadRequestException('Wrong password');
    }
  }
}
