import { BadRequestException, Injectable } from '@nestjs/common';
import { GetVolunteerDto } from './dto/get-Volunteer.dto';
import VolunteerRepository from './repository/volunteer.repository';
import { AwsBucketFolders } from 'src/types';
import { AwsService } from 'src/services';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { emitter } from 'src/utils/emitter';

@Injectable()
export class VolunteerService {
  constructor(
    private volunteerRepository: VolunteerRepository,
    private awsService: AwsService,
    @InjectQueue('volunteers_request') private volunterQueue: Queue,
  ) {}

  async requestForGetVolunteer(volunteerRequest: GetVolunteerDto) {
    const requestFromDb = await this.volunteerRepository.getRequestById(
      volunteerRequest.userId,
    );
    if (requestFromDb?.status) {
      throw new BadRequestException(
        'Hello friend you have already become volunteer',
      );
    }

    if (requestFromDb) {
      await this.volunteerRepository.deleteRequest(requestFromDb.id);
    }

    const docsArray: string[] = [];
    if (volunteerRequest.documents) {
      for (let i = 0; i < volunteerRequest.documents.length; i++) {
        const document = await this.awsService.uploadFile(
          volunteerRequest.documents[i].base64File,
          volunteerRequest.documents[i].ext,
          AwsBucketFolders.DOCUMENTS,
        );
        docsArray.push(document);
      }

      if (requestFromDb?.documents) {
        for (let i = 0; i < requestFromDb?.documents.length; i++) {
          await this.awsService.deleteFile(requestFromDb?.documents[i]);
        }
      }
    }

    const sevenDaysToMs = 604800000;
    const request = await this.volunteerRepository
      .createRequest({ ...volunteerRequest, documents: docsArray })
      .then(async (data) => {
        await this.volunterQueue.add('activationRequest', data.id, {
          delay: sevenDaysToMs,
        });
        return data;
      });

    emitter.emit('newRequest', request);
    return request;
  }
}
