import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthHandleService } from '../services';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AjvValidationPipe } from '../utils/validator/validation';
import { IdSchema } from '../utils/validator/order';
import { IdDto } from '../utils/validator/dto/id.dto';
import { HintPhotoService } from './hint_photo.service';
import { CreateHintPhotoSchema } from '../utils/validator/hint_photo/create-hint-photo.schema';
import { CreateHintPhotoDto } from '../utils/validator/dto/create-hint-photo.dto';
import { UpdateHintPhotoSchema } from '../utils/validator/hint_photo/update-hint-photo.schema';
import { UpdateHintPhotoDto } from '../utils/validator/dto/update-hint-photo.dto';

@ApiTags('Volunteer Hint Photo')
@Controller('hint-photo')
export class HintPhotoController {
  constructor(
    private hintPhotoService: HintPhotoService,
    private authHandleService: AuthHandleService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Get all volunteers hint photo (only volunteer can do it)',
  })
  @Get()
  @UseGuards(RolesGuard)
  @Roles('volunteer', 'admin')
  async getAllHintsPhoto() {
    return this.hintPhotoService.getAllHintsPhoto();
  }

  @ApiResponse({
    status: 200,
    description:
      'Get single volunteers hint photo by id (only volunteer can do it)',
  })
  @Get('/:id')
  @UseGuards(RolesGuard)
  @Roles('volunteer', 'admin')
  @UsePipes(new AjvValidationPipe(IdSchema))
  async getHintPhotoById(@Param() param: IdDto) {
    const { id } = param;
    return this.hintPhotoService.getHintPhotoById(+id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create volunteer hint photo (only volunteer can do it)',
  })
  @Post()
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @UsePipes(new AjvValidationPipe(CreateHintPhotoSchema))
  async createHintPhoto(@Body() hint: CreateHintPhotoDto, @Req() req) {
    const { email } = this.authHandleService.getPayload(
      req.headers['authorization'],
    );
    return this.hintPhotoService.createHintPhoto(hint, email);
  }

  @ApiResponse({
    status: 204,
    description: 'Update volunteer hint (only volunteer can do it)',
  })
  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @UsePipes()
  async updateHintPhotoById(
    @Param(new AjvValidationPipe(IdSchema)) param: IdDto,
    @Body(new AjvValidationPipe(UpdateHintPhotoSchema))
    data: UpdateHintPhotoDto,
  ) {
    const { id } = param;
    return this.hintPhotoService.updateHintPhotoById(+id, data);
  }
}
