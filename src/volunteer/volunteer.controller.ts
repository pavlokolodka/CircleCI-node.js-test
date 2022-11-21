import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { GetVolunteerDto } from './dto/get-Volunteer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AjvValidationPipe } from '../utils/validator/validation';
import { GetVolunteerSchema } from '../utils/validator/volunteer/get-volunteer.schema';

@ApiTags('Volunteer')
@Controller('volunteer')
export class VolunteerController {
  constructor(private volunteerService: VolunteerService) {}

  @ApiResponse({ status: 201, description: 'Request for get status Volunteer' })
  @Post()
  @UsePipes(new AjvValidationPipe(GetVolunteerSchema))
  async requestForGetVolunteer(@Body() volunteerRequest: GetVolunteerDto) {
    return this.volunteerService.requestForGetVolunteer(volunteerRequest);
  }
}
