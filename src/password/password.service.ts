import { BadRequestException, Injectable } from '@nestjs/common';
import { IHttpService } from '../utils/http/http.interface';
import HttpService from '../utils/http/http.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class PasswordService {
  private readonly httpService: IHttpService;
  constructor() {
    this.httpService = new HttpService(process.env.AUTH_SERVICE_URL!);
  }

  async forgotPassword(email: string) {
    return await this.httpService
      .post('/password/forgot', { email })
      .then((data) => data.data)
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return await this.httpService
      .patch('/password/reset', resetPasswordDto)
      .then((data) => data.data)
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return await this.httpService
      .patch('/password/update', updatePasswordDto)
      .then((data) => data.data)
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }
}
