import { ApplicationError } from '../protocols';

export function gameFinished(): ApplicationError {
  return {
    name: 'GameFinished',
    message: 'The game has already ended, so it is not possible to place a bet.',
  };
}
