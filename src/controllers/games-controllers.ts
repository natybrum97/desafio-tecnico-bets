import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputGames } from '../protocols';
import { gamesService } from '../services/games-services';

export async function gamesPost(req: Request, res: Response) {
    const { homeTeamName, awayTeamName } = req.body as InputGames;

    const result = await gamesService.createGames(homeTeamName, awayTeamName);

    return res.status(httpStatus.CREATED).send(result);
}

export const gamesController = {
    gamesPost
};