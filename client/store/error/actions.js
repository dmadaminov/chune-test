import { ERROR_MESSAGE } from './types';

export const errorMessage = message => ({
  type: ERROR_MESSAGE,
  payload: message
});
