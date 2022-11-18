import Repository from '../../../repository/repository';
import { BadRequestException } from '@nestjs/common';
import { ApproveRequestDto } from '../dto/approve-request.dto';

export default class VolunteerRequestsRepository extends Repository {
  async getRequests() {
    return this.prismaService.volunteer_activation_request
      .findMany()
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async getRequestById(id: number) {
    return this.prismaService.volunteer_activation_request
      .findUnique({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async approveRequest(approveRequest: ApproveRequestDto) {
    return this.prismaService.volunteer_activation_request
      .update({
        where: {
          userId: approveRequest.userId,
        },
        data: {
          status: approveRequest.status,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }
}
