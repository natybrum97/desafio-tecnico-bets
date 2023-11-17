import Joi from 'joi';
import { InputGames } from '../protocols';

export const gamesSchema = Joi.object<InputGames>({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required()
});
