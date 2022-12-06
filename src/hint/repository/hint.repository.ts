import Repository from '../../repository/repository';
import { BadRequestException } from '@nestjs/common';
import { ICreateHint, IQueryParams, IUpdateHint } from '../interfaces';

export default class HintRepository extends Repository {
  async getAllHints(params: IQueryParams) {
    const { limit, page, search, sort } = params;
    const skip = limit * (page - 1);
    const hints = await this.prismaService.volunteer_hint
      .findMany({
        skip,
        take: limit,
        orderBy: {
          id: sort,
        },
        where: {
          title: {
            contains: search,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
    const totalPages = Math.round(
      (await this.prismaService.volunteer_hint.count()) / limit,
    );
    return {
      page,
      limit,
      totalPages,
      data: hints,
    };
  }

  async getHintById(id: number) {
    return this.prismaService.volunteer_hint
      .findFirst({
        where: {
          id,
        },
        include: {
          hint_photo: true,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async createHint(hint: ICreateHint, user_id: number) {
    return this.prismaService.volunteer_hint
      .create({
        data: {
          info: hint.info,
          title: hint.title,
          user_id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async updateHintById(id: number, hint: IUpdateHint) {
    return this.prismaService.volunteer_hint
      .update({
        where: {
          id,
        },
        data: {
          title: hint.title != null ? hint.title : undefined,
          info: hint.info != null ? hint.info : undefined,
        },
      })
      .catch(() => {
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

  async getAllPhotosByHintId(hint_id: number) {
    return this.prismaService.volunteer_hint_photo.findMany({
      where: {
        hint_id,
      },
    });
  }

  async createHintPhoto(photo: string, hint_id: number) {
    return this.prismaService.volunteer_hint_photo
      .create({
        data: {
          photo,
          hint_id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async deletePhotoById(id: number) {
    return this.prismaService.volunteer_hint_photo
      .delete({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }
}
