import HintRepository from './hint.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services';
import { HintMatchingObject, hintMock } from '../test/hint.mock';
import { faker } from '@faker-js/faker';

describe('Hint Repository', () => {
  let hintRepository: HintRepository;
  const prismaService = new PrismaService();

  beforeAll(async () => {
    console.log('start 1');
    const user1 = await prismaService.user.upsert({
      create: {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        role: 'customer',
        id: 1,
      },
      update: {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        role: 'customer',
      },
      where: {
        id: 1,
      },
    });

    const user2 = await prismaService.user.upsert({
      create: {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        role: 'customer',
        id: 2,
      },
      update: {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        role: 'customer',
      },
      where: {
        id: 2,
      },
    });
    await prismaService.volunteer_hint
      .create({
        data: {
          id: hintMock().id,
          title: hintMock().title,
          info: hintMock().info,
          user_id: hintMock().user_id,
        },
      })
      .catch(() => {
        return;
      });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, HintRepository],
    }).compile();

    hintRepository = module.get<HintRepository>(HintRepository);
  });

  describe('Get All Hints', () => {
    const params = {
      limit: 10,
      page: 1,
      sort: 'asc',
      search: '',
    };
    test('should find all hints', async () => {
      const data = await hintRepository.getAllHints(params);
      expect(data.data[0]).toMatchObject(HintMatchingObject);
    });
  });

  describe('GetHintById', () => {
    test('should find a existing hint', async () => {
      expect(await hintRepository.getHintById(hintMock().id)).toMatchObject(
        HintMatchingObject,
      );
    });
  });

  describe('Create hint', () => {
    const hint = {
      title: 'new title',
      info: 'new info',
    };
    test('should create hint', async () => {
      const user = await prismaService.user.findFirst({ where: { id: 1 } });
      console.log('user', user);
      const newHint = await hintRepository.createHint(hint, 1);
      expect(newHint).toMatchObject(HintMatchingObject);
      await prismaService.volunteer_hint.delete({ where: { id: newHint.id } });
    }, 20000);
  });

  describe('Update Hint', () => {
    const hint = {
      title: 'update title',
      info: 'update info',
    };
    test('should create hint', async () => {
      const updateHint = await hintRepository.updateHintById(2, hint);
      expect(updateHint).toMatchObject(HintMatchingObject);
    });
  });

  afterAll(async () => {
    await prismaService.volunteer_hint.delete({
      where: {
        id: hintMock().id,
      },
    });
    // await prismaService.user
    //   .findMany({ where: { id: { in: [1, 2] } } })
    //   .then(async (data) => {
    //     data ? await prismaService.user.deleteMany({ where: { id: { in: [1, 2] } } }) : null;
    //   });
    const del1 = prismaService.user.delete({ where: { id: 1 } });
    const del2 = prismaService.user.delete({ where: { id: 2 } });
    await Promise.allSettled([del1, del2]);
    await prismaService.$disconnect();
    console.log('finish 1');
  });
});
