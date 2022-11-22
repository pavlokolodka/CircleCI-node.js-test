import { Injectable } from '@nestjs/common';
import { GetVolunteerDto } from './dto/get-Volunteer.dto';
import VolunteerRepository from './repository/volunteer.repository';
import { AwsBucketFolders } from 'src/types';
import { AwsService } from 'src/services';

@Injectable()
export class VolunteerService {
  constructor(
    private volunteerRepository: VolunteerRepository,
    private awsService: AwsService,
  ) { }

  async requestForGetVolunteer(volunteerRequest: GetVolunteerDto) {
    if (volunteerRequest.document) {
      volunteerRequest.document = await this.awsService.uploadFile(
        volunteerRequest.document,
        volunteerRequest.expansion,
        AwsBucketFolders.DOCUMENTS,
      );
    }
    return this.volunteerRepository.requestForGetVolunteer(volunteerRequest);
  }
}
