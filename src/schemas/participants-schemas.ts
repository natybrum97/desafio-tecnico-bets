import Joi from 'joi';
import { InputParticipants } from '../protocols';

export const participantsSchema = Joi.object<InputParticipants>({
  name: Joi.string().required(),
  balance: Joi.number().required(),
});
