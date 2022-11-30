import Repository from '../../repository/repository';
import { BadRequestException } from '@nestjs/common';
import { CreateHintDto } from '../../utils/validator/dto/create-hint.dto';
import { UpdateHintDto } from '../../utils/validator/dto/update-hint.dto';

export default class HintRepository extends Repository {
  async getAllHints() {
    return this.prismaService.volunteer_hint.findMany().catch(() => {
      throw new BadRequestException('Something went wrong');
    });
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
