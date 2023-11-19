import prisma from '../database';
import { InputGames, InputResultGame } from '../protocols';

async function createGames({ homeTeamName, awayTeamName }: InputGames) {
  return prisma.game.create({
    data: { homeTeamName, awayTeamName },
  });
}

async function findGame(gameId: number) {
  return prisma.game.findFirst({
    where: { id: gameId },
  });
}

async function findManyGames() {
  const result = await prisma.game.findMany();
  return result;
}

async function findGameById(id: number) {
  return prisma.game.findFirst({
    where: { id },
    include: {
      bets: true,
    },
  });
}

async function updateGame(gamesData: InputResultGame, id: number) {
  return prisma.game.update({
    where: { id },
    data: {
      homeTeamScore: gamesData.homeTeamScore,
      awayTeamScore: gamesData.awayTeamScore,
      isFinished: true,
    },
  });
}

export const gamesRepository = {
  createGames,
  findGame,
  findManyGames,
  findGameById,
  updateGame,
};
