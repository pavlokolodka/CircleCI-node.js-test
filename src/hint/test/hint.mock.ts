import { IHint } from '../../types';

export const hintMock = (): IHint => {
  return {
    id: 1,
    title: 'title',
    info: 'info',
    user_id: 2,
    createdAt: new Date(),
  };
};

export const hintMockWithPhoto = (): IHint => {
  return {
    id: 1,
    title: 'title',
    info: 'info',
    user_id: 2,
    createdAt: new Date(),
    volunteer_hints_photo: [
      {
        id: 2,
        hint_id: 1,
        photo: 'photo',
        createdAt: new Date(),
      },
    ],
  };
};
