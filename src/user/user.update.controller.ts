import { Body, Controller, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserUpdateService } from './user.update.service';

@Controller('user-update')
export class UserUpdateController {
    constructor(private readonly userUpdateService: UserUpdateService) { }

    //add current user dec

    @Put('photo')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
    updatePhoto(
        @Body('userId') userId: number,
        @UploadedFiles() filePhoto) {
        return this.userUpdateService.updatePhoto(Number(userId), filePhoto)
    }

    @Put('name')
    updateName(
        @Body('userId') userId: number,
        @Body('name') name: string) {
        return this.userUpdateService.updateName(userId, name)
    }

    @Put('lastname')
    updateLastname(
        @Body('userId') userId: number,
        @Body('lastname') lastname: string) {
        return this.userUpdateService.updateLastname(userId, lastname)
    }
}
