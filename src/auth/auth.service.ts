import * as jwt from 'jsonwebtoken';
import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RecaptchaService } from 'src/utils/recaptcha';


@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly recaptcha: RecaptchaService
  ) { }

  async register(user: CreateUserDto) {
    const recaptchaVerified = await this.recaptcha.check(user.recaptchaToken)
    if (recaptchaVerified) {
      const registeredUser = await this.userService.getByEmail(user.email);
      if (registeredUser) throw new BadRequestException('Something wrong');

      const createdUser = await this.userService.create(user);
      try {
        const res = await this.httpService.axiosRef.post(
          `${process.env.AUTH_SERVICE_URL}/auth/signup`,
          {
            ...user,
            role: createdUser.role,
          },
        );
        return res.data;
      } catch (err) {
        await this.userService.delete(user.email);
        throw new BadRequestException('Something wrong');
      }
    }
  }

  async login(credentials: LoginUserDto) {
    const recaptchaVerified = await this.recaptcha.check(credentials.recaptchaToken)
    if (recaptchaVerified) {
      const registeredUser = await this.userService.getByEmail(credentials.email);
      if (!registeredUser) {
        throw new BadRequestException('Something wrong');
      }

      try {
        const res = await this.httpService.axiosRef.post(
          `${process.env.AUTH_SERVICE_URL}/auth/signin`,
          credentials,
        );
        return res.data;
      } catch (err) {
        throw new BadRequestException('Invalid email or password');
      }
    }
  }

  private validateJwt(token) {
    return jwt.verify(token, process.env.PRIVATE_KEY!);
  }
}
