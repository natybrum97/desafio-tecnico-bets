import { Games, InputGames, InputResultGame, Bets, ObjectBets } from '../protocols';
import { gamesRepository } from '../repositories/games-repositories';
import { invalidDataError } from '../errors/invalid-data-error';
import { notFoundError } from '../errors/not-found-error';
import { gameFinished } from '../errors/game-finished-error';
import { betsRepository } from '../repositories/bets-repositories';

async function createGames(homeTeamName: string, awayTeamName: string): Promise<Games> {
  const gamesData: InputGames = { homeTeamName, awayTeamName };
  const game = await gamesRepository.createGames(gamesData);
  return game;
}

async function findGames() {
  const games = await gamesRepository.findManyGames();
  return games;
}

async function GameFinished(homeTeamScore: number, awayTeamScore: number, id: number): Promise<Games> {
  await businessRules(id);
  const gamesData: InputResultGame = { homeTeamScore, awayTeamScore };
  const betsWon = await betsRepository.GamesWon(gamesData, id);
  const allBets = await betsRepository.AllBets(id);
  const datas = await calculations(betsWon, allBets);
  await updateWonAndLost(id, betsWon, datas.totalWinningAmount, datas.totalAmount);
  const updategame = await gamesRepository.updateGame(gamesData, id);
  return updategame;
}

async function businessRules(id: number): Promise<void> {
  if (!id || isNaN(id)) throw invalidDataError('id');
  const game = await gamesRepository.findGameById(id);
  if (!game) throw notFoundError();
  if (game.isFinished === true) throw gameFinished();
}

async function updateWonAndLost(
  id: number,
  betsWon: Bets[],
  totalWinningAmount: number,
  totalAmount: number,
): Promise<void> {
  await betsRepository.updateGamesWon(betsWon, totalWinningAmount, totalAmount);
  const betsLost = await betsRepository.gamesLost(id, betsWon);
  await betsRepository.updateGamesLost(betsLost);
}

async function calculations(betsWon: ObjectBets[], allBets: ObjectBets[]) {
  const totalWinningAmount = betsWon.reduce((sum, bet) => sum + bet.amountBet, 0);
  const totalAmount = allBets.reduce((sum, bet) => sum + bet.amountBet, 0);

  return { totalWinningAmount, totalAmount };
}

async function getGamesById(id: number) {
  if (!id || isNaN(id)) throw invalidDataError('id');
  const game = await gamesRepository.findGameById(id);
  if (!game) throw notFoundError();
  return game;
}

export const gamesService = {
  createGames,
  findGames,
  getGamesById,
  GameFinished,
  updateWonAndLost,
  calculations,
};
