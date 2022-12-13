import { IHint } from '../../types';
import { IUser } from '../../types/user.types';

export const hintMock = (): IHint => {
  return {
    id: 1,
    title: 'title',
    info: 'info',
    user_id: 2,
    createdAt: new Date(),
    hint_photo: [],
  };
};

export const hintMockWithPhoto = (): IHint => {
  return {
    id: 1,
    title: 'title',
    info: 'info',
    user_id: 2,
    createdAt: new Date('2022-12-09T13:54:37.019Z'),
    hint_photo: [
      {
        id: 2,
        hint_id: 1,
        photo: 'photo',
        createdAt: new Date('2022-12-09T13:54:37.019Z'),
      },
    ],
  };
};

export const user = (): IUser => {
  return {
    id: 1,
    email: 'email@gmail.com',
    name: 'name',
    lastname: 'lastname',
    role: 'volunteer',
    photo: 'photo',
    createdAt: new Date('2022-12-09T13:54:37.019Z'),
    updatedAt: new Date('2022-12-09T13:54:37.019Z'),
  };
};
