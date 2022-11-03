import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpdateNameDto } from './dto/update-name.dto';
import { UserUpdateService } from './user.update.service';

@Controller('user-update')
export class UserUpdateController {
    constructor(private readonly userUpdateService: UserUpdateService) { }

    @Put('name')
    updateName(@Body() updateNameDto: UpdateNameDto) {
        return this.userUpdateService.updateName(updateNameDto)
    }
}
