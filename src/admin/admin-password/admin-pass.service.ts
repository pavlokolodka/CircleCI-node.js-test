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

    const res = await this.httpService.axiosRef
      .post(`${process.env.ADMIN_PASSWORD_SERVICE_URL}/forgot`, {
        email: email,
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return res.data;
  }

  async resetPass(resetPassPayload: AdminResetPassDto) {
    const admin = await this.adminService.getAdminByEmail(
      resetPassPayload.email,
    );

    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    const res = await this.httpService.axiosRef
      .patch(
        `${process.env.ADMIN_PASSWORD_SERVICE_URL}/reset`,
        resetPassPayload,
      )
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return res.data;
  }

  async updatePass(updatePassPayload: AdminUpdatePassDto) {
    const admin = await this.adminService.getAdminByEmail(
      updatePassPayload.email,
    );

    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    const res = await this.httpService.axiosRef
      .patch(
        `${process.env.ADMIN_PASSWORD_SERVICE_URL}/update`,
        updatePassPayload,
      )
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return res.data;
  }
}
