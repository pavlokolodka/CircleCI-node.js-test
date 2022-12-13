import { Test } from '@nestjs/testing';
import { AwsService, PrismaService } from 'src/services';
import UserRepository from '../repository/user.repository';
import { UserService } from '../user.service';
import { MockAwsService, UserMatchingObject, userMock } from './user-mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  const mockAwsService = MockAwsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, UserRepository, AwsService, PrismaService],
    })
      .overrideProvider(AwsService)
      .useValue(mockAwsService)
      .compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    jest.clearAllMocks();

    const prismaService = new PrismaService();
    await prismaService.user
      .create({
        data: {
          email: userMock().email,
          name: userMock().name,
          lastname: userMock().lastname,
          role: userMock().role,
        },
      })
      .catch(() => {
        return;
      });
    await prismaService.$disconnect();
  });

  describe('getByEmail', () => {
    test('call userService.getByEmail', async () =>
      await userService
        .getByEmail(userMock().email)
        .then((data) => expect(data).toMatchObject(UserMatchingObject))
        .catch((err) => expect(err).rejects));

    test('call userService.getByEmail (unexisting email)', async () =>
      await userService
        .getByEmail('unexisting@gmail.com')
        .then((data) => expect(data).toMatchObject(UserMatchingObject))
        .catch((err) => expect(err).rejects));
  });

  describe('getByEmailWithVolunteerAndOrder', () => {
    test('call userService.getByEmailWithVolunteerAndOrder', async () =>
      await userService
        .getByEmailWithVolunteerAndOrder(userMock().email)
        .then((data) =>
          expect(data).toMatchObject({
            ...UserMatchingObject,
            orders: [],
            volunteer_hints: [],
          }),
        )
        .catch((err) => expect(err).rejects));

    test('call userService.getByEmailWithVolunteerAndOrder (unexisting email)', async () =>
      await userService
        .getByEmailWithVolunteerAndOrder('unexisting@gmail.com')
        .then((data) =>
          expect(data).toMatchObject({
            ...UserMatchingObject,
            orders: [],
            volunteer_hints: [],
          }),
        )
        .catch((err) => expect(err).rejects));
  });

  describe('create', () => {
    const createUserDto = {
      email: 'newemail@gmail.com',
      name: 'name',
      lastname: 'lastname',
      password: 'password',
    };

    test('call userService.create', async () =>
      await userService
        .create(createUserDto)
        .then((data) => expect(data).toMatchObject(UserMatchingObject))
        .catch((err) => expect(err).rejects));

    test('call userService.create (existing email)', async () =>
      await userService
        .create({ ...createUserDto, email: userMock().email })
        .then((data) => expect(data).toMatchObject(UserMatchingObject))
        .catch((err) => expect(err).rejects));
  });

  describe('getUserById', () => {
    test('call userService.getUserById', async () =>
      await userService
        .getUserById(userMock().id)
        .then((data) => expect(data).toMatchObject(UserMatchingObject))
        .catch((err) => expect(err).rejects));
  });

  describe('userIsVolunteer', () => {
    test('call userService.userIsVolunteer', async () =>
      await userService
        .userIsVolunteer(userMock().id)
        .then((data) => expect(data).toEqual(expect.any(Boolean)))
        .catch((err) => expect(err).rejects));
  });

  describe('updateUser', () => {
    const updateUserPayload = { name: 'newname', lastname: 'newlastname' };

    test('call userService.update', async () =>
      await userService
        .updateUser(updateUserPayload, userMock().id)
        .then((data) =>
          expect(data).toMatchObject({
            ...UserMatchingObject,
            name: updateUserPayload.name,
            lastname: updateUserPayload.lastname,
          }),
        )
        .catch((err) => expect(err).rejects));

    test('call userService.update photo', async () =>
      await userService
        .updateUser({ image: 'newimage' }, userMock().id)
        .then((data) =>
          expect(data).toMatchObject({
            ...UserMatchingObject,
            photo: 'newimage',
          }),
        )
        .catch((err) => expect(err).rejects));
  });

  describe('delete', () => {
    test('call userService.delete photo', async () =>
      await userService
        .delete(userMock().email)
        .then((data) => expect(data).toMatchObject(UserMatchingObject))
        .catch((err) => expect(err).rejects));
  });
});
