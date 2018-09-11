import {
  CREATE_NEW_USER_BASIC, LOGIN_USER_BASIC, SUCCESS_GET_TOKEN_BASIC
} from './types';

export const createNewUserBasic = (email, password) => ({
  type: CREATE_NEW_USER_BASIC,
  payload: { email, password }
});

export const loginUserBasic = (email, password) => ({
  type: LOGIN_USER_BASIC,
  payload: { email, password }
});

export const successGetTokenBasic = token => ({
  type: SUCCESS_GET_TOKEN_BASIC,
  payload: { token }
});
