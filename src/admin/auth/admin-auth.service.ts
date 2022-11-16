import { BadRequestException, Injectable } from '@nestjs/common';
import { IHttpService } from 'src/utils/http/http.interface';
import HttpService from 'src/utils/http/http.service';
import { AdminService } from '../services/admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminAuthService {
  private httpService: IHttpService;
  constructor(
    private adminService: AdminService,
  ) {
    this.httpService = new HttpService(process.env.ADMIN_AUTH_SERVICE_URL!)
  }

  async loginAdmin(adminPayload: LoginAdminDto) {
    const admin = await this.adminService.getAdminByEmail(adminPayload.email);
    if (!admin) {
      throw new BadRequestException('Admin with this email does not exist');
    }

    const res = await this.httpService.post('/sign-in', adminPayload)
      .catch((err) => {
        throw new BadRequestException(err.message);
      });

    return res.data;
  }
}
