import { IUser } from 'src/types';
import { UpdateUserDto } from '../dto/update-user.dto';

export const userMock = (): IUser => {
  return {
    id: 1,
    email: 'email@gmail.com',
    name: 'name',
    lastname: 'lastname',
    role: 'volunteer',
    photo: 'photo',
    createdAt: new Date('2022-12-09T13:54:37.019Z'),
    updatedAt: new Date('2022-12-09T13:54:37.019Z'),
    //orders: []
  };
};

export const MockUserService = {
  getByEmail: jest.fn((email: string) => userMock()),
  getByEmailWithVolunteerAndOrder: jest.fn((email: string) => userMock()),
  userIsVolunteer: jest.fn((id: number) => true),
  updateUser: jest.fn((updateUserPayload: UpdateUserDto, userId: number) =>
    userMock(),
  ),
};

export const MockAuthHandleService = {
  getPayload: jest.fn((rawToken: string) => userMock()),
};
