import Repository from 'src/repository/repository';
import { GetVolunteerDto } from '../dto/get-Volunteer.dto';
import { BadRequestException } from '@nestjs/common';

export default class VolunteerRepository extends Repository {
  async requestForGetVolunteer(volunteerRequest: GetVolunteerDto) {
    const requestFromDB = await this.prismaService.volunteer_activation_request
      .findFirst({
        where: {
          userId: volunteerRequest.userId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    if (requestFromDB?.status) {
      throw new BadRequestException(
        'Hello friend,you have already become volunteer',
      );
    }

    if (requestFromDB) {
      await this.prismaService.volunteer_activation_request
        .delete({
          where: {
            userId: requestFromDB.userId,
          },
        })
        .catch(() => {
          throw new BadRequestException('Something went wrong');
        });
    }

    const newRequest = await this.prismaService.volunteer_activation_request
      .create({
        data: {
          country: volunteerRequest.country,
          city: volunteerRequest.city,
          card_number: volunteerRequest.card_number,
          document: volunteerRequest.document,
          userId: volunteerRequest.userId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });

    if (requestFromDB) {
      throw new BadRequestException('You have already made request');
    }
    return newRequest;
  }
}
