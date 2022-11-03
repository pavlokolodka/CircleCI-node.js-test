import { Body, Controller, Patch } from '@nestjs/common';
import { UpdateNameDto } from './dto/update-name.dto';
import { UserUpdateService } from './user.update.service';

@Controller('user-update')
export class UserUpdateController {
    constructor(private readonly userUpdateService: UserUpdateService) { }

    @Patch('name')
    updateName(@Body() updateNameDto: UpdateNameDto) {
        return this.userUpdateService.updateName(updateNameDto)
    }
}
