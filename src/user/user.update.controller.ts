import { Body, Controller, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user-update')
export class UserUpdateController {
    constructor(private readonly userService: UserService) { }

    //add current user dec

    @Put('photo')
    updatePhoto(
        @Body('userId') userId: number,
        @Body('photo') photo: string) {
        return this.userService.updatePhoto(userId, photo)
    }

    @Put('name')
    updateName(
        @Body('userId') userId: number,
        @Body('name') name: string) {
        return this.userService.updateName(userId, name)
    }

    @Put('lastname')
    updateLastname(
        @Body('userId') userId: number,
        @Body('lastname') lastname: string) {
        return this.userService.updateLastname(userId, lastname)
    }
}
