import prisma from '../database';
import { InputBetsPost, InputResultGame, Bets } from '../protocols';

async function createBets({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId, status }: InputBetsPost) {
  return prisma.bet.create({
    data: { homeTeamScore, awayTeamScore, amountBet, gameId, participantId, status },
  });
}

async function GamesWon(gamesData: InputResultGame, id: number) {
  return prisma.bet.findMany({
    where: {
      AND: [
        { homeTeamScore: gamesData.homeTeamScore },
        { awayTeamScore: gamesData.awayTeamScore },
        { gameId: id },
        { status: 'PENDING' },
      ],
    },
  });
}

async function gamesLost(id: number, betsWon: Bets[]) {
  return prisma.bet.findMany({
    where: {
      id: { notIn: betsWon.map((bet) => bet.id) },
      status: 'PENDING',
    },
  });
}

async function AllBets(id: number) {
  return prisma.bet.findMany({
    where: {
      AND: [{ gameId: id }, { status: 'PENDING' }],
    },
  });
}

async function updateGamesWon(betsWon: Bets[], totalWinningAmount: number, totalAmount: number) {
  const totalWonByParticipant = await calculateTotalWonByParticipant(betsWon, totalWinningAmount, totalAmount);
  const combinedUpdates = [
    ...betsWon.map((bet) =>
      prisma.bet.update({
        where: { id: bet.id },
        data: { status: 'WON', amountWon: Math.floor((bet.amountBet / totalWinningAmount) * totalAmount * (1 - 0.3)) },
      }),
    ),
    ...Object.entries(totalWonByParticipant).map(([participantId, totalWon]) =>
      prisma.participant.update({
        where: { id: Number(participantId) },
        data: { balance: { increment: totalWon } },
      }),
    ),
  ];
  prisma.$transaction(combinedUpdates);
}

async function calculateTotalWonByParticipant(
  betsWon: Bets[],
  totalWinningAmount: number,
  totalAmount: number,
): Promise<Record<number, number>> {
  const totalWonByParticipant: Record<number, number> = {};
  betsWon.forEach((bet) => {
    totalWonByParticipant[bet.participantId] =
      (totalWonByParticipant[bet.participantId] || 0) +
      Math.floor((bet.amountBet / totalWinningAmount) * totalAmount * (1 - 0.3));
  });
  return totalWonByParticipant;
}

async function updateGamesLost(betsLost: Bets[]) {
  const updatePromises = betsLost.map((bet) => {
    return prisma.bet.update({
      where: { id: bet.id },
      data: {
        status: 'LOST',
        amountWon: 0,
      },
    });
  });

  await Promise.all(updatePromises);
}

export const betsRepository = {
  createBets,
  GamesWon,
  updateGamesWon,
  AllBets,
  updateGamesLost,
  gamesLost,
};
