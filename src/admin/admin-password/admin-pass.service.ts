import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { HttpService } from '@nestjs/axios';
import { AdminResetPassDto } from './dto/admin-reset-pass.dto';
import { AdminUpdatePassDto } from './dto/admin-update-pass.dto';

@Injectable()
export class AdminPassService {
  constructor(
    private adminService: AdminService,
    private httpService: HttpService,
  ) {}

  async forgotPass(email: string) {
    const admin = await this.adminService.getAdminByEmail(email);

    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    try {
      const res = await this.httpService.axiosRef.post(
        `${process.env.ADMIN_PASSWORD_SERVICE_URL}/forgot`,
        {
          email: email,
        },
      );
      return res.data;
    } catch (err) {
      throw new BadRequestException('Wrong password');
    }
  }

  async resetPass(resetPassDto: AdminResetPassDto) {
    const admin = await this.adminService.getAdminByEmail(resetPassDto.email);

    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    try {
      const res = await this.httpService.axiosRef.patch(
        `${process.env.ADMIN_PASSWORD_SERVICE_URL}/reset`,
        resetPassDto,
      );
      return res.data;
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async updatePass(updatePassDto: AdminUpdatePassDto) {
    const admin = await this.adminService.getAdminByEmail(updatePassDto.email);

    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    try {
      const res = await this.httpService.axiosRef.patch(
        `${process.env.ADMIN_PASSWORD_SERVICE_URL}/update`,
        updatePassDto,
      );
      return res.data;
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }
}
