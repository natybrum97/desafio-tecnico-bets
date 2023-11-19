import { ApplicationError } from '../protocols';

export function balanceInsufficient(): ApplicationError {
  return {
    name: 'BalanceInsufficient',
    message: 'Your balance is insufficient to place the bet.',
  };
}
