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

export const gamesRepository = {
  createGames,
  findGame
};