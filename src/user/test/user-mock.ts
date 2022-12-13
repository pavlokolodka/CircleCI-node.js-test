import { IUser } from 'src/types';

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
