import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VolunteerRequestsService } from './volunteer-requests.service';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin/requests')
@Controller('admin/requests')
export class VolunteerRequestsController {
  constructor(private volunteerRequestsService: VolunteerRequestsService) {}

  @ApiResponse({ status: 200, description: 'Get all requests from DB' })
  @Get()
  async getRequests() {
    return this.volunteerRequestsService.getRequests();
  }

  @ApiResponse({ status: 200, description: 'Get single request from DB' })
  @Get('/:id')
  async getRequestById(@Param('id') id: string) {
    return this.volunteerRequestsService.getRequestById(+id);
  }

  @ApiResponse({ status: 201, description: 'Approve or reject request' })
  @Post()
  async approveRequest(@Body() approveRequest: ApproveRequestDto) {
    return this.volunteerRequestsService.approveRequest(approveRequest);
  }
}
