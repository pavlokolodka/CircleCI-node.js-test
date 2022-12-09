import { IUser } from 'src/types';

export const userMock = (): IUser => {
  return {
    id: 1,
    email: 'email@gmail.com',
    name: 'name',
    lastname: 'lastname',
    role: 'volunteer',
    photo: 'photo',
    orders: [
      {
        id: 3,
        user_id: 1,
        status: 'open',
        title: 'title',
        info: 'info',
        photo: 'photo',
        goal_amount: 1000,
        sum: 10,
        short_info: 'short info',
        finished_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
