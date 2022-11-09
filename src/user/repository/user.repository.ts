import { BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import Repository from "src/repository/repository";
import { UpdateUserDto } from "../dto/update-user.dto";

export default class UserRepository extends Repository {
  async update({ userId, name, lastname }: UpdateUserDto) {
    return await this.prismaService.user
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

  async getByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async delete(email: string) {
    return await this.prismaService.user.delete({
      where: {
        email,
      },
    });
  }

  async create(user: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        photo: user.photo,
      },
    });
  }
}