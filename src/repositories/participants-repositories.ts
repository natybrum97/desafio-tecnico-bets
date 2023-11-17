import prisma from "../database";
import { InputParticipants } from "../protocols";

async function createParticipants({name,balance} : InputParticipants) {
    return prisma.participant.create({
        data: { name, balance }
    });
  }

  export const participantsRepository = {
    createParticipants
};