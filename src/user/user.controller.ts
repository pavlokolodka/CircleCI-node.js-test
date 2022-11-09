import { Body, Controller, Patch, UsePipes } from '@nestjs/common';
import { UpdateUserSchema } from 'src/utils/validator/user/index';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'Return updated user' })
  @Patch()
  @UsePipes(new AjvValidationPipe(UpdateUserSchema))
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(updateUserDto);
    return user;
  }
}  
