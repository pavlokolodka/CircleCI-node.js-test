import { Test, TestingModule } from '@nestjs/testing';
import { HintService } from './hint.service';
import { hintMock, hintMockWithPhoto, user } from './test/hint.mock';
import { UserService } from '../user/user.service';
import HintRepository from './repository/hint.repository';
import { AwsService, PrismaService } from '../services';
import UserRepository from '../user/repository/user.repository';

describe('HintService', () => {
  let hintService: HintService;
  let hintRepository: HintRepository;
  let userService: UserService;
  let userRepository: UserRepository;

  const allHints = {
    page: 1,
    limit: 10,
    totalPages: 2,
    data: [hintMockWithPhoto()],
  };

  const hint = {
    title: 'new title',
    info: 'new info',
    photo: ['photo', 'photo'],
  };

  const mockPrismaService = {};
  const mockAwsService = {};

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        HintService,
        UserService,
        HintRepository,
        PrismaService,
        UserService,
        UserRepository,
        AwsService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(AwsService)
      .useValue(mockAwsService)
      .compile();

    hintService = moduleRef.get<HintService>(HintService);
    hintRepository = moduleRef.get<HintRepository>(HintRepository);
    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  test('should be defined', () => {
    expect(hintService).toBeDefined();
  });

  describe('getAllHints', () => {
    test('it should return all hints', async () => {
      jest
        .spyOn(hintRepository, 'getAllHints')
        .mockImplementation(async () => allHints);
      expect(await hintService.getAllHints(10, 'asc', 1, '')).toEqual(allHints);
    });
  });

  describe('getHintById', () => {
    test('it should return one hint', async () => {
      jest
        .spyOn(hintRepository, 'getHintById')
        .mockImplementation(async () => hintMockWithPhoto());
      expect(await hintService.getHintById(2)).toEqual(hintMockWithPhoto());
    });
  });

  describe('create Hint', () => {
    test('it should create hint', async () => {
      jest
        .spyOn(userRepository, 'getByEmail')
        .mockImplementation(async () => await user());
      expect(await userService.getByEmail(user().email)).toEqual(user());
      jest
        .spyOn(hintRepository, 'createHint')
        .mockImplementation(async () => await hintMock());
      expect(await hintService.createHint(hint, user().email)).toEqual(
        hintMock(),
      );
    });
  });

  describe('update Hint', () => {
    test('it should update hint', async () => {
      jest
        .spyOn(hintRepository, 'getHintById')
        .mockImplementation(async () => hintMockWithPhoto());
      expect(await hintService.getHintById(2)).toEqual(hintMockWithPhoto());
      jest
        .spyOn(hintRepository, 'updateHintById')
        .mockImplementation(async () => await hintMock());
      expect(await hintService.updateHintById(2, hint)).toEqual(hintMock());
    });
  });
});
