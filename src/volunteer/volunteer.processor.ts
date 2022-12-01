import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { VolunteerRequestsService } from 'src/admin/volunteer-requests/volunteer-requests.service';

@Processor('volunteers_request')
export class AudioConsumer {
  constructor(
    private readonly volunteerRequestsService: VolunteerRequestsService,
  ) {}

  @Process('activationRequest')
  async transcode(job: Job<unknown>) {
    await this.volunteerRequestsService.approveRequest({
      userId: Number(job.id),
      status: false,
      message: 'Please send the activation request again.',
    });
  }
}
