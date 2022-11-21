import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { VolunteerRequestsService } from './volunteer-requests.service';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AjvValidationPipe } from '../../utils/validator/validation';
import { ApproveRequestSchema } from '../../utils/validator/admin/approve-request/approve-request.schema';

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
  @UsePipes(new AjvValidationPipe(ApproveRequestSchema))
  async approveRequest(@Body() approveRequest: ApproveRequestDto) {
    return this.volunteerRequestsService.approveRequest(approveRequest);
  }
}
