import { ApplicationError } from '../protocols';

export function unauthorizedError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'Some text field is empty.',
  };
}
