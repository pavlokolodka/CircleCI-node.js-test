import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  getByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  delete(email: string) {
    return this.prismaService.user.delete({
      where: {
        email,
      },
    });
  }

  create(user: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        photo: user.photo,
      },
    });
  }
}
