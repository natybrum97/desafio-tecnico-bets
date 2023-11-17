import prisma from "../database";
import { InputBetsPost } from "../protocols";

async function createBets({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId, status }: InputBetsPost) {
    return prisma.bet.create({
        data: { homeTeamScore, awayTeamScore, amountBet, gameId, participantId, status }
    });
}

export const betsRepository = {
    createBets
};