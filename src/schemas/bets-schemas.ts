import Joi from 'joi';
import { InputBets } from '../protocols';

export const betsSchema = Joi.object<InputBets>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});
