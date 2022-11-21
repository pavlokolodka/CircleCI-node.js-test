import { Body, Controller, Post } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { GetVolunteerDto } from './dto/get-Volunteer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Volunteer')
@Controller('volunteer')
export class VolunteerController {
  constructor(private volunteerService: VolunteerService) {}

  @ApiResponse({ status: 201, description: 'Request for get status Volunteer' })
  @Post()
  async requestForGetVolunteer(@Body() volunteerRequest: GetVolunteerDto) {
    return this.volunteerService.requestForGetVolunteer(volunteerRequest);
  }
}
