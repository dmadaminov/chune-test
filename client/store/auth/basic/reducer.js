import { createReducer } from '../../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  email: '',
  password: '',
  token: ''
};

const createNewUserBasic = (state, { email, password }) => ({ ...state, email, password });

const loginUserBasic = (state, { email, password }) => ({ ...state, email, password });

const successGetTokenBasic = (state, { token }) => ({ ...state, token });

const handlers = {
  [TYPES.CREATE_NEW_USER_BASIC]: createNewUserBasic,
  [TYPES.LOGIN_USER_BASIC]: loginUserBasic,
  [TYPES.SUCCESS_GET_TOKEN_BASIC]: successGetTokenBasic
};

export const reducerAuthUserBasic = createReducer(initState, handlers);
