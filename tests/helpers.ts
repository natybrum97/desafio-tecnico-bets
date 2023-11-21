import prisma from './../src/database';

export async function cleanDb() {
  await prisma.bet.deleteMany({});
  await prisma.participant.deleteMany({});
  await prisma.game.deleteMany({});
}
