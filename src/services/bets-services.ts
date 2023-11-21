import { balanceInsufficient } from '../errors/insufficient-balance-error';
import { gameFinished } from '../errors/game-finished-error';
import { notFoundError } from '../errors/not-found-error';
import { Bets, InputBetsPost, Participants } from '../protocols';
import { betsRepository } from '../repositories/bets-repositories';
import { participantsRepository } from '../repositories/participants-repositories';
import { gamesRepository } from '../repositories/games-repositories';

async function createBets(
  homeTeamScore: number,
  awayTeamScore: number,
  amountBet: number,
  gameId: number,
  participantId: number,
): Promise<Bets> {
  const participant = await validateAmountBet(participantId, amountBet);
  await validateGameStatus(gameId);
  const updatedBalance = participant.balance - amountBet;
  await participantsRepository.updateBalance(participantId, updatedBalance);
  const betsData: InputBetsPost = { homeTeamScore, awayTeamScore, amountBet, gameId, participantId, status: 'PENDING' };
  const bet = await betsRepository.createBets(betsData);
  return bet;
}

async function validateAmountBet(participantId: number, amountBet: number): Promise<Participants> {
  const participant = await participantsRepository.findParticipants(participantId);
  if (!participant) throw notFoundError();
  if (amountBet > participant.balance || amountBet <= 0) throw balanceInsufficient();
  return participant;
}

async function validateGameStatus(gameId: number): Promise<void> {
  const game = await gamesRepository.findGame(gameId);
  if (!game) throw notFoundError();
  if (game.isFinished === true) throw gameFinished();
}

export const BetsService = {
  createBets,
};
