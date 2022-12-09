import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PasswordModule } from './password.module';
import { IHttpService } from '../utils/http/http.interface';
import HttpService from '../utils/http/http.service';
import { PasswordService } from './password.service';

describe('Password', () => {
  let app: INestApplication;
  let http: IHttpService;
  let passwordService: PasswordService;
  const payload = {
    email: 'Arvid_Beer@hotmail.com',
  };
  const payload2 = {
    userId: 1,
    newPassword: '12345678',
    oldPassword: '123456789',
  };
  const payload3 = {
    resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    newPassword: '12345678',
    newPasswordConfirm: '12345678',
    recaptchaToken: 'flkadfjdfjfi22ehljfdj',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PasswordModule],
    }).compile();

    passwordService = moduleRef.get<PasswordService>(PasswordService);

    app = moduleRef.createNestApplication();
    await app.init();

    http = new HttpService(process.env.AUTH_SERVICE_URL!);
    await http.patch('/password/update', {
      userId: 1,
      newPassword: '123456789',
      oldPassword: '12345678',
    });
  });

  describe('/password/forgot', () => {
    it(`Post /password/forgot`, () => {
      return request(app.getHttpServer())
        .post('/password/forgot')
        .send(payload)
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject({
            success: true,
          });
        });
    });

    it(`Post /password/forgot with wrong payload`, () => {
      return request(app.getHttpServer())
        .post('/password/forgot')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body).toMatchObject({
            statusCode: 400,
            message: 'Request failed with status code 400',
          });
        });
    });

    it(`Post /password/forgot with nonexistent email`, () => {
      return request(app.getHttpServer())
        .post('/password/forgot')
        .send({ email: 'admin@google.com' })
        .expect(400)
        .expect((res) => {
          expect(res.body).toMatchObject({
            statusCode: 400,
            message: 'Request failed with status code 400',
          });
        });
    });
  });

  describe('/password/update', () => {
    it(`Patch /password/update`, async () => {
      return request(app.getHttpServer())
        .patch('/password/update')
        .send(payload2)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            success: true,
          });
        });
    });

    it(`Patch /password/update with wrong payload`, () => {
      return request(app.getHttpServer())
        .patch('/password/update')
        .send({
          userId: 1,
          newPassword: '12345678',
          oldPassword: '12345678',
        })
        .expect(400);
    });

    it(`Patch /password/update with blank payload`, () => {
      return request(app.getHttpServer())
        .patch('/password/update')
        .send({})
        .expect(400);
    });
  });

  describe('/password/reset', () => {
    it(`Patch /password/reset with wrong payload`, () => {
      return request(app.getHttpServer())
        .patch('/password/reset')
        .send({
          resetToken: 'fadfdfddffdf',
          newPassword: '12345678',
          newPasswordConfirm: '12345678',
        })
        .expect(400);
    });

    it(`Patch /password/reset with blank payload`, () => {
      return request(app.getHttpServer())
        .patch('/password/reset')
        .send({})
        .expect(400);
    });

    it(`Patch /password/reset`, () => {
      const result = { success: true };
      jest
        .spyOn(passwordService, 'resetPassword')
        .mockImplementation(() => Promise.resolve(result));

      return request(app.getHttpServer())
        .patch('/password/reset')
        .send(payload3)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            success: true,
          });
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
