import { Test } from '@nestjs/testing';
import { AwsService, PrismaService } from 'src/services';
import { VolunteerService } from './volunteer.service';
import VolunteerRepository from './repository/volunteer.repository';
import VolunteerMockRepository from './repository/volunteer.mock.repository';
import { MockAwsService } from '../services/mocks';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

describe('Test Volunteer Service', () => {
  let volunteerService: VolunteerService;
  let mockVolunteerRepo: VolunteerRepository;
  const mockPrismaService = {};
  const bullQueueVolunteersRequest = {
    add: jest.fn(),
  };
  const expectedResult = {
    userId: expect.any(Number),
    city: expect.any(String),
    card_number: expect.any(String),
    country: expect.any(String),
    document: expect.any(String),
    status: null,
    id: expect.any(Number),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        VolunteerService,
        VolunteerRepository,
        AwsService,
        PrismaService,
      ],
      imports: [
        BullModule.registerQueue({
          name: 'volunteers_request',
        }),
      ],
    })
      .overrideProvider(getQueueToken('volunteers_request'))
      .useValue(bullQueueVolunteersRequest)
      .overrideProvider(VolunteerRepository)
      .useClass(VolunteerMockRepository)
      .overrideProvider(AwsService)
      .useClass(MockAwsService)
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    volunteerService = moduleRef.get<VolunteerService>(VolunteerService);
    mockVolunteerRepo = moduleRef.get<VolunteerRepository>(VolunteerRepository);

    jest.useRealTimers();
    jest.clearAllMocks();
  }, 30000);

  it('Test requestForGetVolunteer', async () => {
    const data = {
      userId: Number(faker.random.numeric()),
      city: faker.address.city(),
      cardNumber: faker.finance.creditCardNumber(),
      country: faker.address.country(),
      document: faker.internet.url(),
      expansion: 'pdf',
    };
    const res = await volunteerService.requestForGetVolunteer(data);

    expect(res).toEqual(expectedResult);
  });

  it('Test requestForGetVolunteer with status true', async () => {
    const data = {
      userId: Number(faker.random.numeric()),
      city: faker.address.city(),
      cardNumber: faker.finance.creditCardNumber(),
      country: faker.address.country(),
      document: faker.internet.url(),
      expansion: 'pdf',
    };
    jest
      .spyOn(mockVolunteerRepo, 'getRequestById')
      .mockImplementation(async () => {
        return {
          id: 127,
          country: 'Ukraine',
          city: 'Zaporizhzhia',
          card_number: '123456789101123',
          document:
            'https://krauddonate161122.s3.eu-central-1.amazonaws.com/documents/ad67fd79-48e7-42bf-9a81-8bbf32ad22a3.sTZDl5nNofvL8sU',
          userId: 1,
          status: true,
        };
      });

    try {
      const res = await volunteerService.requestForGetVolunteer(data);

      expect(await volunteerService.requestForGetVolunteer(data)).toThrow(
        BadRequestException,
      );
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe(
        'Hello friend you have already become volunteer',
      );
    }
  });
});
