import { AppModule } from './../src/app.module';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { userMock } from '../src/user/test/user-mock';
import { UserService } from '../src/user/user.service';
import { UpdateUserDto } from '../src/user/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import UserRepository from '../src/user/repository/user.repository';
import { AuthHandleService, AwsService } from './../src/services';
import { AwsBucketFolders } from '../src/types';
import { CreateUserDto } from '../src/auth/dto/create-user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockUserService = {
    getByEmail: jest.fn((email: string) => userMock()),
    getByEmailWithVolunteerAndOrder: jest.fn((email: string) => userMock()),
    userIsVolunteer: jest.fn((id: number) => true),
    updateUser: jest.fn((updateUserPayload: UpdateUserDto, userId: number) =>
      userMock(),
    ),
  };
  const mockAuthHandleService = {
    getPayload: jest.fn((rawToken: string) => userMock()),
  };
  const mockJwtService = {};
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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(AuthHandleService)
      .useValue(mockAuthHandleService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(UserRepository)
      .useValue(mockUserRepository)
      .overrideProvider(AwsService)
      .useValue(mockAwsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(mockUserService.getByEmail(userMock().email))
      .expect(200);
  });
});
