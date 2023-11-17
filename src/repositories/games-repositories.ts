import prisma from "../database";
import { InputGames } from "../protocols";

async function createGames({ homeTeamName, awayTeamName }: InputGames) {
  return prisma.game.create({
    data: { homeTeamName, awayTeamName }
  });
}

async function findGame(gameId: number) {
  return prisma.game.findFirst({
    where: { id: gameId }
  });
}

async function findManyGames() {
  const result = await prisma.game.findMany();
  return result;
}

export const gamesRepository = {
  createGames,
  findGame,
  findManyGames
};