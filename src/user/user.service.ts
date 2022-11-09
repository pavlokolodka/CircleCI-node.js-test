import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    return user;
  }

  async delete(email: string) {
    const user = await this.userRepository.delete(email);
    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = await this.userRepository.create(user);
    return newUser;
  }

  async get(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async updateUser({ userId, name, lastname }: UpdateUserDto) {
    const user = await this.userRepository.update({ userId, name, lastname });
    return user;
  }
}
