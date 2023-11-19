import prisma from '../database';
import { InputParticipants } from '../protocols';

async function createParticipants({ name, balance }: InputParticipants) {
  return prisma.participant.create({
    data: { name, balance },
  });
}

async function findParticipants(participantId: number) {
  return prisma.participant.findFirst({
    where: { id: participantId },
  });
}

async function updateBalance(participantId: number, newBalance: number) {
  return prisma.participant.update({
    where: { id: participantId },
    data: { balance: newBalance },
  });
}

async function findManyParticipants() {
  const result = await prisma.participant.findMany();
  return result;
}

export const participantsRepository = {
  createParticipants,
  findParticipants,
  updateBalance,
  findManyParticipants,
};
