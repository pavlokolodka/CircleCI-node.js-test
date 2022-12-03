import Repository from '../../repository/repository';
import { BadRequestException } from '@nestjs/common';
import { CreateHintDto } from '../../utils/validator/dto/create-hint.dto';
import { UpdateHintDto } from '../../utils/validator/dto/update-hint.dto';

export default class HintRepository extends Repository {
  async getAllHints(limit: number, sort, page: number, search: string) {
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
      (await this.prismaService.order.findMany()).length / limit,
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
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async createHint(hint: CreateHintDto, user_id: number) {
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

  async updateHintById(id: number, hint: UpdateHintDto) {
    return this.prismaService.volunteer_hint.update({
      where: {
        id,
      },
      data: {
        title: hint.title != null ? hint.title : undefined,
        info: hint.info != null ? hint.info : undefined,
      },
    });
  }
}
