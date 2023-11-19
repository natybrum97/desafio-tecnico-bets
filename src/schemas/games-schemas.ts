import Joi from 'joi';
import { InputGames, InputResultGame } from '../protocols';

export const gamesSchema = Joi.object<InputGames>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const gameFinishSchema = Joi.object<InputResultGame>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});
