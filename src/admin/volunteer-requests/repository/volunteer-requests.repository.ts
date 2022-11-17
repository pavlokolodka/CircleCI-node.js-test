import Repository from '../../../repository/repository';
import { BadRequestException } from '@nestjs/common';

export default class VolunteerRequestsRepository extends Repository {
  async getRequests() {
    return this.prismaService.volunteer.findMany().catch(() => {
      throw new BadRequestException('Something went wrong');
    });
  }

  async getRequestById(id: number) {
    return this.prismaService.volunteer
      .findUnique({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async approveRequest(status: boolean) {
    console.log(1);
  }
}
