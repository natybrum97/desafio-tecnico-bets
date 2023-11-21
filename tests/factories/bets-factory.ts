import prisma from '../../src/database';
import { participantsRepository } from '../../src/repositories/participants-repositories';
import { participantsFactory } from './participants-factory';

export async function createBets(participantId: number, gameId: number, balance: number) {
  return await prisma.bet.create({
    data: {
      homeTeamScore: 0,
      awayTeamScore: 1,
      amountBet: balance,
      gameId,
      participantId,
      status: 'PENDING',
    },
  });
}

export async function createBetsLost(participantId: number, gameId: number, balance: number) {
  return await prisma.bet.create({
    data: {
      homeTeamScore: 2,
      awayTeamScore: 2,
      amountBet: balance,
      gameId,
      participantId,
      status: 'PENDING',
    },
  });
}

export async function updateBalance(balance: number, amountBet: number, participantId: number) {
  const updatedBalance = balance - amountBet;
  await participantsRepository.updateBalance(participantId, updatedBalance);
}

export async function BetDatas(gameId: number) {
  const participantLost = await participantsFactory.createParticipantLost();
  const createParticipantFirst = await participantsFactory.createParticipantFirst();
  const createParticipantSecond = await participantsFactory.createParticipantSecond();
  const betsWon = [
    await createBets(createParticipantFirst.id, gameId, createParticipantFirst.balance),
    await createBets(createParticipantSecond.id, gameId, createParticipantSecond.balance),
  ];
  const allBets = [
    await createBets(createParticipantFirst.id, gameId, createParticipantFirst.balance),
    await createBets(createParticipantSecond.id, gameId, createParticipantSecond.balance),
    await createBetsLost(participantLost.id, gameId, participantLost.balance),
  ];
  await updateBalance(createParticipantFirst.balance, createParticipantFirst.balance, createParticipantFirst.id);
  await updateBalance(createParticipantSecond.balance, createParticipantSecond.balance, createParticipantSecond.id);
  await updateBalance(participantLost.balance, participantLost.balance, participantLost.id);

  return { allBets, betsWon, participantLost, createParticipantFirst, createParticipantSecond };
}

export const betFormat = {
  id: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  homeTeamScore: expect.any(Number),
  awayTeamScore: expect.any(Number),
  amountBet: expect.any(Number),
  gameId: expect.any(Number),
  participantId: expect.any(Number),
  status: expect.any(String),
  amountWon: null,
};

export const betsFactory = {
  createBets,
  createBetsLost,
  BetDatas,
  updateBalance,
};
