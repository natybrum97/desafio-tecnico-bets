import prisma from '../../src/database';

export async function createGame() {
  return await prisma.game.create({
    data: {
      homeTeamName: 'Vasco',
      awayTeamName: 'Flamengo',
    },
  });
}

export async function createManyGames() {
  return await prisma.game.createMany({
    data: [
      { homeTeamName: 'Vasco', awayTeamName: 'Flamengo' },
      { homeTeamName: 'Santos', awayTeamName: 'Bahia' },
    ],
  });
}

async function updateGame(id: number) {
  return prisma.game.update({
    where: { id },
    data: {
      homeTeamScore: Math.floor(Math.random() * 10001),
      awayTeamScore: Math.floor(Math.random() * 10001),
      isFinished: true,
    },
  });
}

export const gameFormat = {
  id: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  homeTeamName: expect.any(String),
  awayTeamName: expect.any(String),
  homeTeamScore: expect.any(Number),
  awayTeamScore: expect.any(Number),
  isFinished: expect.any(Boolean),
};

export const gamesFormat = [
  {
    id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    homeTeamName: expect.any(String),
    awayTeamName: expect.any(String),
    homeTeamScore: expect.any(Number),
    awayTeamScore: expect.any(Number),
    isFinished: expect.any(Boolean),
  },
  {
    id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    homeTeamName: expect.any(String),
    awayTeamName: expect.any(String),
    homeTeamScore: expect.any(Number),
    awayTeamScore: expect.any(Number),
    isFinished: expect.any(Boolean),
  },
];

export const gameWithBetFormat = {
  id: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  homeTeamName: expect.any(String),
  awayTeamName: expect.any(String),
  homeTeamScore: expect.any(Number),
  awayTeamScore: expect.any(Number),
  isFinished: expect.any(Boolean),
  bets: [
    {
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
    },
  ],
};

export const gamesFactory = {
  createGame,
  updateGame,
  createManyGames,
};
