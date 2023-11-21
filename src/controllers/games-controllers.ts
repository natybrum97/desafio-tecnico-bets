import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputGames, InputResultGame } from '../protocols';
import { gamesService } from '../services/games-services';

export async function gamesPost(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body as InputGames;
  const result = await gamesService.createGames(homeTeamName, awayTeamName);
  return res.status(httpStatus.CREATED).send(result);
}

export async function gamesGet(_req: Request, res: Response) {
  const result = await gamesService.findGames();
  return res.status(httpStatus.OK).send(result);
}

export async function getGamesById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const game = await gamesService.getGamesById(id);
  res.status(httpStatus.OK).send(game);
}

export async function gamefinishPost(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore } = req.body as InputResultGame;
  const id = Number(req.params.id);
  const result = await gamesService.GameFinished(homeTeamScore, awayTeamScore, id);
  return res.status(httpStatus.OK).send(result);
}

export const gamesController = {
  gamesPost,
  gamesGet,
  getGamesById,
  gamefinishPost,
};
