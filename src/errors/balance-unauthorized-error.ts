import { ApplicationError } from '../protocols';

export function balanceUnauthorized(): ApplicationError {
  return {
    name: 'BalanceUnauthorized',
    message: 'Your balance cannot be below R$10,00.',
  };
}
