import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { VolunteerModule } from './volunteer.module';
import { Volunteer_activation_request } from '@prisma/client';
import { PrismaService } from '../services';
import { faker } from '@faker-js/faker';

describe('Volunteer', () => {
  let app: INestApplication;
  const payload = {
    country: faker.address.country(),
    city: faker.address.city(),
    document: faker.internet.avatar(),
    cardNumber: faker.finance.creditCardNumber(),
    expansion: 'pdf',
    userId: 10,
  };
  const payload2 = {
    country: faker.address.country(),
    city: faker.address.city(),
    document: faker.internet.avatar(),
    cardNumber: faker.finance.creditCardNumber(),
    expansion: 'pdf',
    userId: 9,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [VolunteerModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const prismaService = new PrismaService();

    // Update the entities in the database to restore the initial state
    await prismaService.volunteer_activation_request.upsert({
      where: {
        userId: 9,
      },
      create: {
        country: 'Ukraine',
        city: 'Kyiv',
        document:
          'https://krauddonate161122.s3.eu-central-1.amazonaws.com/documents/6afa0386-0727-436d-bc90-bf3f2e907631.pdf',
        card_number: '1111111111111111111',
        userId: 9,
        status: true,
      },
      update: {
        status: true,
      },
    });
    await prismaService.volunteer_activation_request.upsert({
      where: {
        userId: 10,
      },
      create: {
        country: 'Ukraine',
        city: 'Kyiv',
        document:
          'https://krauddonate161122.s3.eu-central-1.amazonaws.com/documents/6afa0386-0727-436d-bc90-bf3f2e907631.pdf',
        card_number: '1111111111111111111',
        userId: 10,
        status: false,
      },
      update: {
        status: false,
      },
    });

    await prismaService.$disconnect();
  });

  it(`Post /volunteer with status null or false`, () => {
    return request(app.getHttpServer())
      .post('/volunteer')
      .send(payload)
      .expect(201)
      .expect((res) => {
        const { cardNumber, expansion, ...result } = payload;
        expect(res.body).toMatchObject<Volunteer_activation_request>({
          ...result,
          id: expect.any(Number),
          document: expect.any(String),
          card_number: payload.cardNumber,
          status: null,
        });
      });
  });

  it(`Post /volunteer with missing property`, () => {
    return request(app.getHttpServer())
      .post('/volunteer')
      .send({
        country: faker.address.country(),
        city: faker.address.city(),
        document: faker.internet.avatar(),
        cardNumber: faker.finance.creditCardNumber(),
        expansion: 'pdf',
      })
      .expect(400);
  });

  it(`Post /volunteer with status true`, () => {
    return request(app.getHttpServer())
      .post('/volunteer')
      .send(payload2)
      .expect(400)
      .expect((res) => {
        expect(res.body).toMatchObject({
          statusCode: 400,
          message: 'Hello friend you have already become volunteer',
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
