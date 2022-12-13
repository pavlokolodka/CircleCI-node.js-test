import { HintService } from './hint.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import HintRepository from './repository/hint.repository';
import { PrismaService } from '../services';
import { HintMatchingObject, hintMock } from './test/hint.mock';
import { userMock } from './test/user.mock';

describe('Hint Service', () => {
  let hintService: HintService;
  const prismaService = new PrismaService();

  beforeAll(async () => {
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

  const mockUserService = {
    getByEmail: jest.fn().mockImplementation(() => userMock()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HintService, UserService, HintRepository, PrismaService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    hintService = module.get<HintService>(HintService);
  });

  afterAll(async () => {
    await prismaService.volunteer_hint.delete({ where: { id: hintMock().id } });
    await prismaService.$disconnect();
  });

  describe('Find Hints', () => {
    test('should find all hints', async () => {
      await hintService
        .getAllHints(10, 'asc', 1, '')
        .then((value) =>
          expect(value.data[0]).toMatchObject(HintMatchingObject),
        );
    });
  });

  describe('Find Hint', () => {
    test('should find a existing hint', async () => {
      await hintService
        .getHintById(hintMock().id)
        .then((data) => expect(data).toMatchObject(HintMatchingObject));
    });
  });

  describe('Create Hint', () => {
    const email = 'Arvid_Beer@hotmail.com';
    const hint = {
      title: 'new title',
      info: 'new info',
    };
    test('should create hint', async () => {
      const data = await hintService.createHint(hint, email);
      expect(data).toMatchObject(HintMatchingObject);
      await prismaService.volunteer_hint.delete({ where: { id: data.id } });
    });
  });

  describe('Update Hint', () => {
    const hint = {
      title: 'update title',
      info: 'update info',
    };
    test('should create hint', async () => {
      await hintService
        .updateHintById(hintMock().id, hint)
        .then((data) => expect(data).toMatchObject(HintMatchingObject));
    });
  });
});
