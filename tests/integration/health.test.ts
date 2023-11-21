import httpStatus from 'http-status';
import supertest from 'supertest';
import app from '../../src/app';
import { cleanDb } from '../helpers';

afterAll(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /health', () => {
  it('should respond with status 200 with Im ok! text', async () => {
    const response = await server.get('/health');
    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe("I'm ok!");
  });
});
