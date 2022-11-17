import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VolunteerRequestsService } from './volunteer-requests.service';

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
  async approveRequest(@Body() status: boolean) {
    return this.volunteerRequestsService.approveRequest(status);
  }
}
