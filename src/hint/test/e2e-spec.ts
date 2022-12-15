import { HintService } from '../hint.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HintModule } from '../hint.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { hintMock } from './hint.mock';
import { RolesGuard } from '../../auth/guards/roles.guard';

describe('Hint', () => {
  let app: INestApplication;
  let hintService: HintService;

  const mockGuard = jest.fn().mockImplementation(() => true);

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HintModule],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    hintService = moduleRef.get<HintService>(HintService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Get All Hints', () => {
    it(`/hint (GET)`, async () => {
      const response = await request(app.getHttpServer()).get('/hint');
      expect(response.status).toBe(200);
      expect(response.body.data[0].title).toEqual(hintMock().title);
    });
  });

  describe('Get Hint By Id', () => {
    it(`/hint/:id (GET)`, async () => {
      const response = await request(app.getHttpServer()).get(
        `/hint/${hintMock().id}`,
      );
      expect(response.status).toBe(200);
      expect(response.body.info).toEqual(hintMock().info);
    });
  });

  describe('Get Hint By Id Take 400 error', () => {
    it(`/hint/:id (GET) take Bad Request`, async () => {
      const response = await request(app.getHttpServer()).get(`/hint/sss`);
      expect(response.status).toBe(400);
    });
  });

  describe('Update Hint', () => {
    const hint = {
      title: 'title',
      info: 'info',
    };
    it(`/hint/:id (Patch)`, async () => {
      const response = await request(app.getHttpServer())
        .patch(`/hint/${hintMock().id}`)
        .send(hint);
      expect(response.status).toBe(200);
      expect(response.body.title).toEqual(hint.title);
    });
  });

  describe('Update Hint Take 400 Error', () => {
    const hint = {
      title: 'title',
      info: 1,
    };
    it(`/hint/:id (Patch)`, async () => {
      const response = await request(app.getHttpServer())
        .patch(`/hint/${hintMock().id}`)
        .send(hint);
      expect(response.status).toBe(400);
    });
  });

  describe('Create Hint', () => {
    const hint = {
      title: 'title',
      info: 'info',
    };
    it(`/hint (Post)`, async () => {
      const response = await request(app.getHttpServer())
        .post(`/hint`)
        .send(hint);
      expect(response.status).toBe(201);
      expect(response.body.title).toEqual(hint.title);
    });
  });

  describe('Create Hint Take 400 error', () => {
    const hint = {
      title: 'title',
      info: 1,
    };
    it(`/hint (Post)`, async () => {
      const response = await request(app.getHttpServer())
        .post(`/hint`)
        .send(hint);
      expect(response.status).toBe(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
