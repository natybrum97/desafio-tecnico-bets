import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import app from '../../src/app';
import { cleanDb } from '../helpers';
import { manyParticipantsFormat, participantsFactory, participantsFormat } from '../factories/participants-factory';

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /participants', () => {
  it('should respond with status 401 if the participant has an initial balance of less than R$10.00', async () => {
    const response = await server.post('/participants').send({
      name: faker.person.firstName(),
      balance: Math.floor(Math.random() * 1000),
    });
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 201 on the post /participants route', async () => {
    const response = await server.post('/participants').send({
      name: faker.person.firstName(),
      balance: Math.floor(Math.random() * 10000) + 1000,
    });
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(participantsFormat);
  });
});

describe('GET /participants', () => {
  it('should respond with status 200 on the get /participants route', async () => {
    await participantsFactory.createParticipants();
    const response = await server.get('/participants');
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(manyParticipantsFormat);
  });
});
