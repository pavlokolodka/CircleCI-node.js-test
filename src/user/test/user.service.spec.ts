import { Test } from '@nestjs/testing';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AwsService } from 'src/services';
import { AwsBucketFolders } from 'src/types';
import { UpdateUserDto } from '../dto/update-user.dto';
import UserRepository from '../repository/user.repository';
import { UserService } from '../user.service';
import { userMock } from './user-mock';

describe('UserService', () => {
  let userService: UserService;
  const mockUserRepository = {
    update: jest.fn((updateUserPayload: UpdateUserDto, userId: number) =>
      userMock(),
    ),
    getById: jest.fn((id: number) => userMock()),
    getByEmail: jest.fn((email: string) => userMock()),
    getByEmailWithVolunteerAndOrder: jest.fn((email: string) => userMock()),
    delete: jest.fn((email: string) => userMock()),
    create: jest.fn((user: CreateUserDto) => userMock()),
  };
  const mockAwsService = {
    uploadImg: jest.fn(async (base64: string, folder: AwsBucketFolders) =>
      Promise.resolve('file location'),
    ),
    uploadFile: jest.fn(
      async (base64: string, ext: string, folder: AwsBucketFolders) =>
        Promise.resolve('file location'),
    ),
    deleteFile: jest.fn(async (location: string) => {
      return Promise.resolve({ success: true });
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, UserRepository, AwsService],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUserRepository)
      .overrideProvider(AwsService)
      .useValue(mockAwsService)
      .compile();

    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('getByEmail', () => {
    let user;

    beforeEach(async () => {
      user = await userService.getByEmail(userMock().email);
    });
    test('call userRepository/getByEmail', () => {
      expect(mockUserRepository.getByEmail(userMock().email)).toEqual(
        userMock(),
      );
    });
    test('return user', () => {
      expect(user).toEqual(userMock());
    });
  });

  describe('getByEmailWithVolunteerAndOrder', () => {
    let user;

    beforeEach(async () => {
      user = await userService.getByEmailWithVolunteerAndOrder(
        userMock().email,
      );
    });
    test('call userRepository/getByEmail', () => {
      expect(
        mockUserRepository.getByEmailWithVolunteerAndOrder(userMock().email),
      ).toEqual(userMock());
    });
    test('return user', () => {
      expect(user).toEqual(userMock());
    });
  });

  describe('delete', () => {
    let user;

    beforeEach(async () => {
      user = await userService.delete(userMock().email);
    });
    test('call userRepository/delete', () => {
      expect(mockUserRepository.delete(userMock().email)).toEqual(userMock());
    });
    test('return user', () => {
      expect(user).toEqual(userMock());
    });
  });

  describe('create', () => {
    let user;
    const createUserDto = {
      email: 'email',
      name: 'name',
      lastname: 'lastname',
      password: 'password',
    };

    beforeEach(async () => {
      user = await userService.create(createUserDto);
    });
    test('call userRepository/create', () => {
      expect(mockUserRepository.create(createUserDto)).toEqual(userMock());
    });
    test('return user', () => {
      expect(user).toEqual(userMock());
    });
  });

  describe('getUserById', () => {
    let user;

    beforeEach(async () => {
      user = await userService.getUserById(userMock().id);
    });
    test('call userRepository/getById', () => {
      expect(mockUserRepository.getById(userMock().id)).toEqual(userMock());
    });
    test('return user', () => {
      expect(user).toEqual(userMock());
    });
  });

  describe('updateUser', () => {
    let user;
    const updateUserPayload = { name: 'name', lastname: 'lastname' };

    beforeEach(async () => {
      user = await userService.updateUser(updateUserPayload, userMock().id);
    });
    test('call userRepository/update', () => {
      expect(
        mockUserRepository.update(updateUserPayload, userMock().id),
      ).toEqual({ ...userMock(), updatedAt: expect.any(Date) });
    });
    test('return user', () => {
      expect(user).toEqual(userMock());
    });
  });

  describe('updateUser photo', () => {
    let user;
    const updateUserPayload = { image: 'image' };

    beforeEach(async () => {
      user = await userService.updateUser(updateUserPayload, userMock().id);
    });
    test('call awsService/uploadImg', async () => {
      mockAwsService
        .uploadImg(updateUserPayload.image, AwsBucketFolders.USER_AVATAR)
        .then((data) => {
          expect(mockAwsService.deleteFile).toBeCalledWith('photo');
          expect(data).toEqual('file location');
        });
    });
    test('call userRepository/update', () => {
      expect(
        mockUserRepository.update(updateUserPayload, userMock().id),
      ).toEqual({ ...userMock(), updatedAt: expect.any(Date) });
    });
    test('return user', () => {
      expect(user).toEqual(userMock());
    });
  });

  describe('userIsVolunteer', () => {
    let res: boolean;

    beforeEach(async () => {
      res = await userService.userIsVolunteer(userMock().id);
    });
    test('call userRepository/getById', () => {
      expect(mockUserRepository.getById(userMock().id)).toEqual(userMock());
    });
    test('call userIsVolunteer', () => {
      expect(res).toEqual(expect.any(Boolean));
    });
  });
});
