import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HintPhotoRepository } from './repository/hint-photo.repository';
import { CreateHintPhotoDto } from '../utils/validator/dto/create-hint-photo.dto';
import { UpdateHintPhotoDto } from '../utils/validator/dto/update-hint-photo.dto';
import { AwsService } from '../services';
import { AwsBucketFolders } from '../types';

@Injectable()
export class HintPhotoService {
  constructor(
    private volunteerHintPhotoRepository: HintPhotoRepository,
    private userService: UserService,
    private awsService: AwsService,
  ) {}

  async getAllHintsPhoto() {
    return this.volunteerHintPhotoRepository.getAllHintsPhoto();
  }

  async getHintPhotoById(id: number) {
    return this.volunteerHintPhotoRepository.getHintPhotoById(id);
  }

  async createHintPhoto(hintPhoto: CreateHintPhotoDto) {
    if (hintPhoto.photo) {
      hintPhoto.photo = await this.awsService.uploadImg(
        hintPhoto.photo,
        AwsBucketFolders.HINTPHOTO,
      );
    }
    return this.volunteerHintPhotoRepository.createHintPhoto(hintPhoto);
  }

  async updateHintPhotoById(id: number, hintPhoto: UpdateHintPhotoDto) {
    const hintFromDb = await this.getHintPhotoById(id);
    if (!hintFromDb) throw new BadRequestException('Hint not found.');

    if (hintPhoto.photo) {
      const oldPhoto = hintFromDb.photo;

      hintPhoto.photo = await this.awsService
        .uploadImg(hintPhoto.photo, AwsBucketFolders.HINTPHOTO)
        .then(async (data) => {
          if (oldPhoto) await this.awsService.deleteFile(oldPhoto);
          return data;
        });
    }
    return this.volunteerHintPhotoRepository.updateHintPhotoById(id, hintPhoto);
  }
}
