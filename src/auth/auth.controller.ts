import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async register(@Body() user: CreateUserDto, @Res() res) {
    const token = await this.authService.register(user);
    res.set('Authorization', `Bearer ${token}`);
    res.send({ message: 'Success' });
  }

  @Post('/sign-in')
  async login(@Body() user: LoginUserDto, @Res() res) {
    const token = await this.authService.login(user);
    res.set('Authorization', `Bearer ${token}`);
    res.send({ message: 'Success' });
  }
}
