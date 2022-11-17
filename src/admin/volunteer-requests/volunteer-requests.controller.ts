import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VolunteerRequestsService } from './volunteer-requests.service';
import { ApproveRequestDto } from './dto/approve-request.dto';

@Controller('admin/requests')
export class VolunteerRequestsController {
  constructor(private volunteerRequestsService: VolunteerRequestsService) {}

  @Get()
  async getRequests() {
    return this.volunteerRequestsService.getRequests();
  }

  @Get('/:id')
  async getRequestById(@Param('id') id: string) {
    return this.volunteerRequestsService.getRequestById(+id);
  }

  @Post()
  async approveRequest(@Body() approveRequest: ApproveRequestDto) {
    return this.volunteerRequestsService.approveRequest(approveRequest);
  }
}
