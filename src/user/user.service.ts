import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async updatePhoto(id: number, photo: string) {
        return await this.prisma.user.update({ where: { id }, data: { photo } })
            .catch(() => { throw new BadRequestException('Something went wrong.') })
    }

    async updateName(id: number, name: string) {
        return await this.prisma.user.update({ where: { id }, data: { name } })
            .catch(() => { throw new BadRequestException('Something went wrong.') })
    }

    async updateLastname(id: number, lastname: string) {
        return await this.prisma.user.update({ where: { id }, data: { lastname } })
            .catch(() => { throw new BadRequestException('Something went wrong.') })
    }
}
