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
import { HintService } from './hint.service';
import { IdDto } from '../utils/validator/dto/id.dto';
import { AjvValidationPipe } from '../utils/validator/validation';
import { IdSchema } from '../utils/validator/order';
import { CreateHintDto } from '../utils/validator/dto/create-hint.dto';
import { CreateHintSchema } from '../utils/validator/hint/create-hint.schema';
import { UpdateHintSchema } from '../utils/validator/hint/update-hint.schema';
import { UpdateHintDto } from '../utils/validator/dto/update-hint.dto';
import { AuthHandleService } from '../services';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Volunteer Hint')
@Controller('hint')
export class HintController {
  constructor(
    private hintService: HintService,
    private authHandleService: AuthHandleService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Get all volunteers hint (only volunteer can do it)',
  })
  @Get()
  @UseGuards(RolesGuard)
  @Roles('volunteer', 'admin')
  async getAllHints() {
    return this.hintService.getAllHints();
  }

  @ApiResponse({
    status: 200,
    description: 'Get single volunteers hint by id (only volunteer can do it)',
  })
  @Get('/:id')
  @UseGuards(RolesGuard)
  @Roles('volunteer', 'admin')
  @UsePipes(new AjvValidationPipe(IdSchema))
  async getHintById(@Param() param: IdDto) {
    const { id } = param;
    return this.hintService.getHintById(+id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create volunteer hint (only volunteer can do it)',
  })
  @Post()
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @UsePipes(new AjvValidationPipe(CreateHintSchema))
  async createHint(@Body() hint: CreateHintDto, @Req() req) {
    const { email } = this.authHandleService.getPayload(
      req.headers['authorization'],
    );
    return this.hintService.createHint(hint, email);
  }

  @ApiResponse({
    status: 204,
    description: 'Update volunteer hint (only volunteer can do it)',
  })
  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles('volunteer')
  @UsePipes()
  async updateHintById(
    @Param(new AjvValidationPipe(IdSchema)) param: IdDto,
    @Body(new AjvValidationPipe(UpdateHintSchema)) data: UpdateHintDto,
  ) {
    const { id } = param;
    return this.hintService.updateHintById(+id, data);
  }
}
