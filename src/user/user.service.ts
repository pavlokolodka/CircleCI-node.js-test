import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async updateUser({ userId, name, lastname }: UpdateUserDto) {
    return await this.prisma.user
      .update({
        where: { id: userId },
        data: {
          name: name != null ? name : undefined,
          lastname: lastname != null ? lastname : undefined,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong.');
      });
  }
}
