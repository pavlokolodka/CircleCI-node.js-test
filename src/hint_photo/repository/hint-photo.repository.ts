import Repository from '../../repository/repository';
import { BadRequestException } from '@nestjs/common';
import { CreateHintPhotoDto } from '../../utils/validator/dto/create-hint-photo.dto';
import { UpdateHintPhotoDto } from '../../utils/validator/dto/update-hint-photo.dto';

export class HintPhotoRepository extends Repository {
  async getAllHintsPhoto() {
    return this.prismaService.volunteer_hint_photo.findMany().catch(() => {
      throw new BadRequestException('Something went wrong');
    });
  }

  async getHintPhotoById(id: number) {
    return this.prismaService.volunteer_hint_photo
      .findFirst({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async createHintPhoto(hintPhoto: CreateHintPhotoDto) {
    return this.prismaService.volunteer_hint_photo
      .create({
        data: {
          text: hintPhoto.text,
          photo: hintPhoto.photo,
          hint_id: hintPhoto.hintId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async updateHintPhotoById(id: number, hintPhoto: UpdateHintPhotoDto) {
    return this.prismaService.volunteer_hint_photo.update({
      where: {
        id,
      },
      data: {
        text: hintPhoto.text != null ? hintPhoto.text : undefined,
        photo: hintPhoto.photo != null ? hintPhoto.photo : undefined,
      },
    });
  }
}
