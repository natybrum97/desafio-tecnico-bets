import prisma from '../../src/database';

export async function createParticipants() {
  return await prisma.participant.createMany({
    data: [
      { name: 'Participant1', balance: 1000 },
      { name: 'Participant2', balance: 2000 },
    ],
  });
}

export async function createParticipant() {
  return await prisma.participant.create({
    data: { name: 'Participant1', balance: 1000 },
  });
}

export async function createParticipantLost() {
  return await prisma.participant.create({
    data: { name: 'Participant1', balance: 3000 },
  });
}

export async function createParticipantFirst() {
  return await prisma.participant.create({
    data: { name: 'Participant1', balance: 1000 },
  });
}

export async function createParticipantSecond() {
  return await prisma.participant.create({
    data: { name: 'Participant1', balance: 2000 },
  });
}

export const participantsFormat = {
  id: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  name: expect.any(String),
  balance: expect.any(Number),
};

export const manyParticipantsFormat = [
  {
    id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    name: expect.any(String),
    balance: expect.any(Number),
  },
  {
    id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    name: expect.any(String),
    balance: expect.any(Number),
  },
];

export const participantsFactory = {
  createParticipants,
  createParticipant,
  createParticipantLost,
  createParticipantFirst,
  createParticipantSecond,
};
