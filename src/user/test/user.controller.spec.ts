import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { createRequest } from 'node-mocks-http';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AwsService } from 'src/services';
import { AuthHandleService } from 'src/services/auth.handle.service';
import UserRepository from '../repository/user.repository';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { MockAuthHandleService, MockUserService, userMock } from './user-mock';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UserController', () => {
  let userController: UserController;
  const mockUserService = MockUserService;
  // {
  //     getByEmail: jest.fn((email: string) => userMock()),
  //     getByEmailWithVolunteerAndOrder: jest.fn((email: string) => userMock()),
  //     userIsVolunteer: jest.fn((id: number) => true),
  //     updateUser: jest.fn((updateUserPayload: UpdateUserDto, userId: number) =>
  //         userMock()
  //     )
  // };
  const mockAuthHandleService = MockAuthHandleService;
  // {
  //     getPayload: jest.fn((rawToken: string) => userMock()),
  // };
  const mockJwtService = {};
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

    test('call authHandleService', () => {
      expect(mockAuthHandleService.getPayload('Bearer token')).toEqual(
        userMock(),
      );
    });
    test('call userService/getByEmail', () => {
      expect(mockUserService.getByEmail(userMock().email)).toEqual(userMock());
    });
    test('call getUser', () => {
      expect(userController.getUser(req)).toEqual(userMock());
    });
  });

  describe('getUserAndVolunteer', () => {
    const req = createRequest({
      headers: { authorization: 'Bearer authorization' },
    });

    test('call authHandleService', () => {
      expect(mockAuthHandleService.getPayload('Bearer token')).toEqual(
        userMock(),
      );
    });
    test('call userService', () => {
      expect(
        mockUserService.getByEmailWithVolunteerAndOrder(userMock().email),
      ).toEqual(userMock());
    });
    test('call getUserAndVolunteer', () => {
      expect(userController.getUserAndVolunteer(req)).toEqual(userMock());
    });
  });

  describe('updateUser', () => {
    let user;
    const req = createRequest({
      headers: { authorization: 'Bearer token' },
    });

    beforeEach(async () => {
      user = await userController.updateUser(req, {
        name: 'name',
        lastname: 'lastname',
        image: 'image',
      });
    });
    test('call authHandleService', () => {
      expect(mockAuthHandleService.getPayload('Bearer token')).toEqual(
        userMock(),
      );
    });
    test('call userService/getByEmail', () => {
      expect(mockUserService.getByEmail(userMock().email)).toEqual(userMock());
    });
    test('call userService/updateUser', () => {
      expect(
        mockUserService.updateUser(
          { name: 'name', lastname: 'lastname', image: 'image' },
          userMock().id,
        ),
      ).toEqual({ ...userMock(), updatedAt: expect.any(Date) });
    });
    test('call return user', () => {
      expect(user).toEqual({ ...userMock(), updatedAt: expect.any(Date) });
    });
  });

  describe('isVolunteer', () => {
    let res: boolean;

    beforeEach(async () => {
      res = await userController.isVolunteer({ id: userMock().id.toString() });
    });
    test('call userService', () => {
      expect(mockUserService.userIsVolunteer).toBeCalledWith(userMock().id);
    });
    test('return boolean', () => {
      expect(res).toEqual(expect.any(Boolean));
    });
  });
});
