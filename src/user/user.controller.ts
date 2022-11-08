import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'Return user info' })
  @Roles('customer')
  @UseGuards(RolesGuard)
  @Get()
  get(@Req() req) {
    const { email } = req;
    return this.userService.get(email);
  }

  @ApiResponse({ status: 200, description: 'Return updated user' })
  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }
}
