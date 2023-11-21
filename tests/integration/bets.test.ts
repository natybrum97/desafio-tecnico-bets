import supertest from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { cleanDb } from '../helpers';
import { participantsFactory } from '../factories/participants-factory';
import { gamesFactory } from '../factories/games-factory';
import { betFormat } from '../factories/bets-factory';
import { participantsRepository } from '../../src/repositories/participants-repositories';

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /bets', () => {
  it('should respond with status 404 if the participant id does not exist', async () => {
    const participant = await participantsFactory.createParticipant();
    const game = await gamesFactory.createGame();
    const response = await server.post('/bets').send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
      amountBet: participant.balance,
      gameId: game.id,
      participantId: 600,
    });
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 404 if the game id does not exist', async () => {
    const participant = await participantsFactory.createParticipant();
    const response = await server.post('/bets').send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
      amountBet: participant.balance,
      gameId: 600,
      participantId: participant.id,
    });
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 401 if the participant balance is less than the bet amount.', async () => {
    const participant = await participantsFactory.createParticipant();
    const game = await gamesFactory.createGame();
    const response = await server.post('/bets').send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
      amountBet: participant.balance + 1000,
      gameId: game.id,
      participantId: participant.id,
    });
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if the bet value is 0.', async () => {
    const participant = await participantsFactory.createParticipant();
    const game = await gamesFactory.createGame();
    const response = await server.post('/bets').send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
      amountBet: 0,
      gameId: game.id,
      participantId: participant.id,
    });
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if the bet amount is less than 0.', async () => {
    const participant = await participantsFactory.createParticipant();
    const game = await gamesFactory.createGame();
    const response = await server.post('/bets').send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
      amountBet: Math.floor(Math.random() * -10000),
      gameId: game.id,
      participantId: participant.id,
    });
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if the game has already been finished.', async () => {
    const participant = await participantsFactory.createParticipant();
    const game = await gamesFactory.createGame();
    await gamesFactory.updateGame(game.id);
    const response = await server.post('/bets').send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
      amountBet: participant.balance,
      gameId: game.id,
      participantId: participant.id,
    });
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 201 on the post /bets route', async () => {
    const participant = await participantsFactory.createParticipant();
    const game = await gamesFactory.createGame();
    const response = await server.post('/bets').send({
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
      amountBet: participant.balance,
      gameId: game.id,
      participantId: participant.id,
    });
    const afterTheBet = await participantsRepository.findParticipants(participant.id);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(betFormat);
    expect(afterTheBet.balance).toEqual(0);
  });
});
