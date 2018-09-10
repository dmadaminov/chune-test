import { createReducer } from '../../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  email: '',
  password: '',
  token: ''
};

const createNewUserBasic = (state, { email, password }) => ({ ...state, email, password });

const successCreateNewUserBasic = (state, { token }) => ({ ...state, token });

const handlers = {
  [TYPES.CREATE_NEW_USER_BASIC]: createNewUserBasic,
  [TYPES.SUCCESS_CREATE_NEW_USER_BASIC]: successCreateNewUserBasic
};

export const reducerAuthUserBasic = createReducer(initState, handlers);
