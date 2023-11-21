import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import app from '../../src/app';
import { cleanDb } from '../helpers';
import { participantsFactory } from '../factories/participants-factory';
import { gameFormat, gameWithBetFormat, gamesFactory, gamesFormat } from '../factories/games-factory';
import { betsFactory } from '../factories/bets-factory';
import { participantsRepository } from '../../src/repositories/participants-repositories';
import { gamesService } from '../../src/services/games-services';

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /games', () => {
  it('should respond with status 201 on the post /games route', async () => {
    const response = await server.post('/games').send({
      homeTeamName: faker.word.words(),
      awayTeamName: faker.word.words(),
    });
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(gameFormat);
  });
});

describe('GET /games', () => {
  it('should respond with status 200 on the get /games route', async () => {
    await gamesFactory.createManyGames();
    const response = await server.get('/games');
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(gamesFormat);
  });
});

describe('GET /games/:id', () => {
  it('should respond with status 400 if the id is not a number.', async () => {
    const participant = await participantsFactory.createParticipant();
    const response = await server.get(`/games/${participant.name}`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 if the id does not exist .', async () => {
    const response = await server.get(`/games/null`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 404 if the id provided is not valid .', async () => {
    const response = await server.get(`/games/1`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should calculate totalWinningAmount and totalAmount correctly', async () => {
    const game = await gamesFactory.createGame();
    const datas = await betsFactory.BetDatas(game.id);
    const calculations = await gamesService.calculations(datas.betsWon, datas.allBets);
    await gamesService.updateWonAndLost(
      game.id,
      datas.betsWon,
      calculations.totalWinningAmount,
      calculations.totalAmount,
    );
    await gamesFactory.updateGame(game.id);
    const first = await participantsRepository.findParticipants(datas.createParticipantFirst.id);
    const second = await participantsRepository.findParticipants(datas.createParticipantSecond.id);
    const lost = await participantsRepository.findParticipants(datas.participantLost.id);
    expect(first.balance).toBe(1400);
    expect(second.balance).toBe(2800);
    expect(lost.balance).toBe(0);
  });

  it('should respond with status 200 on the get /games/:id route', async () => {
    const participant = await participantsFactory.createParticipant();
    const game = await gamesFactory.createGame();
    await betsFactory.createBets(participant.id, game.id, participant.balance);
    const response = await server.get(`/games/${game.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(gameWithBetFormat);
  });
});

describe('POST /games/:id/finish', () => {
  it('should respond with status 400 if the id is not a number.', async () => {
    const participant = await participantsFactory.createParticipant();
    const response = await server.post(`/games/${participant.name}/finish`).send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
    });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 if the id does not exist .', async () => {
    const response = await server.post(`/games/null/finish`).send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
    });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 404 if the id provided is not valid .', async () => {
    const response = await server.post(`/games/1/finish`).send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
    });
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 401 if the game has already been finished.', async () => {
    const game = await gamesFactory.createGame();
    await gamesFactory.updateGame(game.id);
    const response = await server.post(`/games/${game.id}/finish`).send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
    });
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 200 on the get /games/:id/finish route', async () => {
    const game = await gamesFactory.createGame();
    const response = await server.post(`/games/${game.id}/finish`).send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
    });
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(gameFormat);
  });
});
