import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AwsService } from 'src/services';
import { AuthHandleService } from '../../services/auth.handle.service';
import UserRepository from '../repository/user.repository';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userMock } from './user-mock';
import { createRequest } from 'node-mocks-http';
import { IUser } from 'src/types';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

jest.mock('../user.service.ts');

describe('UserController', () => {
  let userController: UserController;
  const mockUserService = {
    getByEmail: jest.fn((email: string) => userMock()),
    getByEmailWithVolunteerAndOrder: jest.fn((email: string) => userMock()),
    delete: jest.fn((email: string) => userMock()),
    create: jest.fn((createUserDto: CreateUserDto) => userMock()),
    getUserById: jest.fn((id: number) => userMock()),
    updateUser: jest.fn((updateUserPayload: UpdateUserDto, userId: number) =>
      userMock(),
    ),
    userIsVolunteer: jest.fn((id: number) => true),
  };
  const mockAuthHandleService = {
    getPayload: jest.fn((rawToken) => userMock()),
  };
  const mockJwtService = {
    verify: jest.fn((token, publicKey) => userMock()),
  };
  const mockUserRepository = {};
  const mockAwsService = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository,
        AuthHandleService,
        JwtService,
        RolesGuard,
        AwsService,
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(AuthHandleService)
      .useValue(mockAuthHandleService)
      .overrideProvider(UserRepository)
      .useValue(mockUserRepository)
      .overrideProvider(AwsService)
      .useValue(mockAwsService)
      .compile();

    userController = moduleRef.get<UserController>(UserController);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    const req = createRequest({
      headers: { authorization: 'Bearer authorization' },
    });

    test('calling authHandleService/jwtService', () => {
      const token = req.headers['authorization'] || 'Bearer authorization';
      expect(mockAuthHandleService.getPayload(token)).toEqual(userMock());
      expect(mockJwtService.verify(token, { publicKey: 'publicKey' })).toEqual(
        userMock(),
      );
    });
    test('calling userService', () => {
      expect(mockUserService.getByEmail(userMock().email)).toEqual(userMock());
    });
    test('calling getUser', () => {
      expect(userController.getUser(req)).toEqual(userMock());
    });
  });

  describe('isVolunteer', () => {
    let res: boolean;

    beforeEach(async () => {
      res = await userController.isVolunteer({ id: userMock().id.toString() });
    });
    test('calling userService', () => {
      expect(mockUserService.userIsVolunteer).toBeCalledWith(userMock().id);
    });
    test('returning boolean', () => {
      expect(res).toEqual(expect.any(Boolean));
    });
  });
});
