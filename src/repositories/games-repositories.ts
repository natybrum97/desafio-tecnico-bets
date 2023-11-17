import prisma from "../database";
import { InputGames } from "../protocols";

async function createGames({homeTeamName, awayTeamName} : InputGames) {
    return prisma.game.create({
        data: { homeTeamName, awayTeamName }
    });
  }

  export const gamesRepository = {
    createGames
};