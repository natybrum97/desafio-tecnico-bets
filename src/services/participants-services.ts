import { balanceUnauthorized } from '../errors/balance-unauthorized-error';
import { InputParticipants, Participants } from '../protocols';
import { participantsRepository } from '../repositories/participants-repositories';

async function createParticipants(name: string, balance: number): Promise<Participants> {
    if (balance < 1000) throw balanceUnauthorized();
    const participantsData: InputParticipants = { name, balance };
    const participant = await participantsRepository.createParticipants(participantsData);
    return participant;
}

export const participantsService = {
    createParticipants
};