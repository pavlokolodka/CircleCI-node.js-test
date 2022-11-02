import { PrismaService } from 'src/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { FileManagerService } from 'src/file-manager/file-manager.service';
import { FileTypes, ResourceTypes } from 'src/types/static-img.enum';


@Injectable()
export class UserUpdateService {
    constructor(private prisma: PrismaService,
        private fileManagerService: FileManagerService) { }

    async updatePhoto(id: number, filePhoto: any) {
        const user = await this.prisma.user.findFirst({ where: { id } })
        const newPhotoPath = this.fileManagerService.createFile(
            FileTypes.IMG, ResourceTypes.USER_PHOTO, filePhoto.photo[0])

        return await this.prisma.user.update(
            { where: { id }, data: { photo: newPhotoPath } })
            .then((data) => {
                if (user.photo) this.fileManagerService.deleteFile(user.photo)
                return data
            })
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
