import { Injectable } from '@nestjs/common';
import VolunteerRequestsRepository from './repository/volunteer-requests.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class VolunteerRequestsService {
  constructor(
    private volunteerRequestsRepository: VolunteerRequestsRepository,
    private mailService: MailerService,
  ) {}

  async getRequests() {
    return this.volunteerRequestsRepository.getRequests();
  }

  async getRequestById(id: number) {
    return this.volunteerRequestsRepository.getRequestById(id);
  }

  async approveRequest(status: boolean) {
    if (!status) {
      await this.mailService.sendMail({});
    }
    return this.volunteerRequestsRepository.approveRequest(status);
  }
}
