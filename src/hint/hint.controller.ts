import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { HintService } from './hint.service';
import { IdDto } from '../utils/validator/dto/id.dto';
import { AjvValidationPipe } from '../utils/validator/validation';
import { IdSchema } from '../utils/validator/order';
import { AuthHandleService } from '../services';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../utils/validator/dto/pagination.dto';
import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';

@ApiTags('Volunteer Hint')
@Controller('hint')
export class HintController {
  constructor(
    private hintService: HintService,
    private authHandleService: AuthHandleService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Get all volunteers hint',
  })
  @Get()
  async getAllHints(@Query() params: PaginationDto) {
    const { limit = 10, sort = 'asc', page = 1, search } = params;
    return this.hintService.getAllHints(+limit, sort, +page, search);
  }

  @ApiResponse({
    status: 200,
    description: 'Get single volunteers hint by id',
  })
  @Get('/:id')
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
    @Body() data: UpdateHintDto,
  ) {
    const { id } = param;
    return this.hintService.updateHintById(+id, data);
  }
}
