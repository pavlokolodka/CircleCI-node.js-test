import { BadRequestException, Injectable } from '@nestjs/common';
import HintRepository from './repository/hint.repository';
import { UserService } from '../user/user.service';
import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';
import { AwsBucketFolders } from '../types';
import { AwsService } from '../services';

@Injectable()
export class HintService {
  constructor(
    private hintRepository: HintRepository,
    private userService: UserService,
    private awsService: AwsService,
  ) {}

  async getAllHints(limit: number, sort: string, page: number, search: string) {
    return this.hintRepository.getAllHints({ limit, sort, page, search });
  }

  async getHintById(id: number) {
    return this.hintRepository.getHintById(id);
  }

  async getHintPhotoById(id: number) {
    return this.hintRepository.getHintPhotoById(id);
  }

  async getAllPhotosByHintId(hintId: number) {
    return this.hintRepository.getAllPhotosByHintId(hintId);
  }

  async createHint(hint: CreateHintDto, email: string) {
    const userFromDb = await this.userService.getByEmail(email);
    if (!userFromDb) throw new BadRequestException('Something went wrong');
    const newHint = await this.hintRepository.createHint(hint, userFromDb.id);
    if (hint.photos.length && newHint) {
      await this.createHintPhoto(hint.photos, newHint.id);
    }
    return newHint;
  }

  async createHintPhoto(photos: string[], hintId: number) {
    photos.map(async (photo) => {
      photo = await this.awsService.uploadImg(
        photo,
        AwsBucketFolders.HINTPHOTO,
      );
      return this.hintRepository.createHintPhoto(photo, hintId);
    });
  }

  async updateHintById(id: number, hint: UpdateHintDto) {
    const hintFromDb = await this.getHintById(id);
    if (!hintFromDb) throw new BadRequestException('Hint not found.');
    const updateHint = await this.hintRepository.updateHintById(id, hint);
    if (updateHint) {
      await this.updateHintPhotoById(hintFromDb.id, hint.photos);
    }
    return updateHint;
  }

  async updateHintPhotoById(hintId: number, photos: string[]) {
    if (photos.length && hintId) {
      const photosByHintId = await this.getAllPhotosByHintId(hintId);

      if (photosByHintId.length) {
        photosByHintId.map(async (item) => {
          await this.awsService.deleteFile(item.photo);
          await this.deletePhotoById(item.id);
        });
      }
    }
    return this.createHintPhoto(photos, hintId);
  }

  async deletePhotoById(id: number) {
    return this.hintRepository.deletePhotoById(id);
  }
}
