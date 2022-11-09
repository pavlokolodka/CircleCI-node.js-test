import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { CreateUserSchema, LoginUserSchema } from '../utils/validator/user';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User created' })
  @Post('/sign-up')
  @UsePipes(new AjvValidationPipe(CreateUserSchema))
  async register(@Body() user: CreateUserDto, @Res() res: Response) {
    const token = await this.authService.register(user);
    res.set('Authorization', `Bearer ${token}`);
    res.send({ message: 'Success' });
  }

  @ApiResponse({ status: 200, description: 'User signed in' })
  @Post('/sign-in')
  @UsePipes(new AjvValidationPipe(LoginUserSchema))
  async login(@Body() user: LoginUserDto, @Res() res: Response) {
    const token = await this.authService.login(user);
    res.set('Authorization', `Bearer ${token}`);
    res.send({ message: 'Success' });
  }
}
