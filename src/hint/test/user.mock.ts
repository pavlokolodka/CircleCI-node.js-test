import { IUser } from '../../types';

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
