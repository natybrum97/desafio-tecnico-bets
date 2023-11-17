import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputParticipants } from '../protocols';
import { participantsService } from '../services/participants-services';

export async function participantsPost(req: Request, res: Response) {
    const { name, balance } = req.body as InputParticipants;

    const result = await participantsService.createParticipants(name, balance);

    return res.status(httpStatus.CREATED).send(result);
}

export const participantsController = {
    participantsPost
};