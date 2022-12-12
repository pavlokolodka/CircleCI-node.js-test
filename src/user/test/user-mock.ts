import { AwsBucketFolders, IUser } from 'src/types';

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
  };
};

export const UserMatchingObject = {
  id: expect.any(Number),
  email: userMock().email,
  name: expect.any(String),
  lastname: expect.any(String),
  role: expect.any(String),
  photo: null,
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const MockAwsService = {
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
