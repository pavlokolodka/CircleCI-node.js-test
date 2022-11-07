import { Body, Controller, Patch, UsePipes } from '@nestjs/common';
import { UpdateUserSchema } from 'src/utils/validator/user/index';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Patch()
  @UsePipes(new AjvValidationPipe(UpdateUserSchema))
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(updateUserDto);
    return user;
  }
}
