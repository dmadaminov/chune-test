import { createReducer } from '../../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  token: ''
};

const successCreateNewUserBasic = (state, { token }) => ({ ...state, token });

const handlers = {
  [TYPES.SUCCESS_CREATE_NEW_USER_BASIC]: successCreateNewUserBasic
};

export const reducerAuthUserBasic = createReducer(initState, handlers);
