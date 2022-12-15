import { Injectable } from '@nestjs/common';
import VolunteerRequestsRepository from './repository/volunteer-requests.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { UserService } from '../../user/user.service';
import { REJECTED_TEMP } from '../../templates/rejected-request';
import { VolunteerRequestStatus } from 'src/types';

@Injectable()
export class VolunteerRequestsService {
  constructor(
    private volunteerRequestsRepository: VolunteerRequestsRepository,
    private mailService: MailerService,
    private userService: UserService,
  ) {}

  async getRequests() {
    return this.volunteerRequestsRepository.getRequests();
  }

  async getRequestById(id: number) {
    return this.volunteerRequestsRepository.getRequestById(id);
  }

  async changeRequestStatus(dto: ApproveRequestDto) {
    // -- PROBLEM WITH GRID
    // if (dto.status === VolunteerRequestStatus.REJECTED) {
    //   const user = await this.userService.getUserById(dto.userId);
    //   if (user) {
    //     await this.mailService.sendMail({
    //       to: user.email,
    //       from: 'krauddonate@gmail.com',
    //       subject: 'Rejected request',
    //       html: REJECTED_TEMP(user.name, dto.message),
    //     });
    //   }
    // }
    return this.volunteerRequestsRepository.changeRequestStatus(dto);
  }
}
