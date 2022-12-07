import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class RecaptchaService {
  constructor(private readonly httpService: HttpService) {}

  async check(recaptchaToken: string) {
    return await this.httpService.axiosRef
      .post(
        `https://www.google.com/recaptcha/api/siteverify`,
        {},
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaToken,
          },
        },
      )
      .then((data) => data.data.success)
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
