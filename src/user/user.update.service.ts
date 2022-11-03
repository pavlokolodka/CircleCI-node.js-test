import { PrismaService } from 'src/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateNameDto } from './dto/update-name.dto';

@Injectable()
export class UserUpdateService {
    constructor(private prisma: PrismaService) { }

    async updateName({ userId, name, lastname }: UpdateNameDto) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                name: name != null ? name : undefined,
                lastname: lastname != null ? lastname : undefined
            }
        }).catch(() => { throw new BadRequestException('Something went wrong.') })
    }
}
