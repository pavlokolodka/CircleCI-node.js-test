import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { IUser } from 'src/types';
import Repository from '../../repository/repository';
import { UpdateUserDto } from '../dto/update-user.dto';

export const userMock = (): IUser => {
  return {
    id: 1,
    email: 'email@gmail.com',
    name: 'name',
    lastname: 'lastname',
    role: 'volunteer',
    photo: null,
    createdAt: new Date('2022-12-09T13:54:37.019Z'),
    updatedAt: new Date('2022-12-09T13:54:37.019Z'),
  };
};

export const UserMatchingObject = {
  id: expect.any(Number),
  email: expect.any(String),
  name: expect.any(String),
  lastname: expect.any(String),
  role: expect.any(String),
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export class MockUserRepository extends Repository {
  async update(updateUserDto: UpdateUserDto, userId: number) {
    return userMock();
  }

  async getById(id: number) {
    return userMock();
  }

  async getByEmail(email: string) {
    return userMock();
  }

  async getByEmailWithVolunteerAndOrder(email: string) {
    return { ...userMock(), orders: [], volunteer_hints: [] };
  }

  async delete(email: string) {
    return userMock();
  }

  async create(user: CreateUserDto) {
    return userMock();
  }
}
