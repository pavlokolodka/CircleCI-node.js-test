import { Test, TestingModule } from '@nestjs/testing';
import { HintController } from './hint.controller';
import { HintService } from './hint.service';
import { AuthHandleService } from '../services';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '../auth/guards/roles.guard';
import { userMock } from './test/user.mock';
import { hintMock, hintMockWithPhoto } from './test/hint.mock';
import { createRequest } from 'node-mocks-http';
import { IdDto } from '../utils/validator/dto/id.dto';
import { PaginationDto } from '../utils/validator/dto/pagination.dto';

describe('HintController', () => {
  let hintController: HintController;
  let hintService: HintService;

  const allHints = {
    page: 1,
    limit: 10,
    totalPages: 2,
    data: hintMock(),
  };

  const hint = {
    title: 'new title',
    info: 'new info',
    photo: ['photo', 'photo'],
  };

  const param: IdDto = {
    id: '2',
  };

  const pagination: PaginationDto = {
    limit: '10',
    page: '1',
    sort: 'asc',
    search: '',
  };

  const mockHintService = {
    getAllHints: jest.fn((pagination) => allHints),
    getHintById: jest.fn((param) => hintMockWithPhoto()),
    createHint: jest.fn((hint, request) => hintMock()),
    updateHintById: jest.fn((param, hint) => hintMock()),
  };

  const mockAuthHandleService = {
    getPayload: jest.fn((rawToken) => userMock()),
  };
  const mockJwtService = {
    verify: jest.fn((token, publicKey) => userMock()),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HintController],
      providers: [
        HintService,
        AuthHandleService,
        JwtService,
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(HintService)
      .useValue(mockHintService)
      .overrideProvider(AuthHandleService)
      .useValue(mockAuthHandleService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    hintService = moduleRef.get<HintService>(HintService);
    hintController = moduleRef.get<HintController>(HintController);
  });

  test('should be defined', () => {
    expect(hintController).toBeDefined();
  });

  describe('getAllHints', () => {
    test('getHints', async () => {
      expect(await hintController.getAllHints(pagination)).toEqual(allHints);
    });
  });

  describe('getHintById', () => {
    test('getHint', async () => {
      expect(await hintController.getHintById(param)).toEqual(
        hintMockWithPhoto(),
      );
    });
  });

  describe('createHint', () => {
    const req = createRequest({
      headers: { authorization: 'Bearer token' },
    });

    test('calling authHandleService/jwtService', async () => {
      const token = req.headers['authorization'];
      expect(mockAuthHandleService.getPayload(token)).toEqual(userMock());
      expect(mockJwtService.verify(token, { publicKey: 'publicKey' })).toEqual(
        userMock(),
      );
    });

    test('createHint', async () => {
      expect(await hintController.createHint(hint, req)).toEqual(hintMock());
    });
  });

  describe('update Hint', () => {
    test('update', async () => {
      expect(await hintController.updateHintById(param, hint)).toEqual(
        hintMock(),
      );
    });
  });
});
