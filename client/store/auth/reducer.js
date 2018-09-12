import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  token: '',
  profile: {}
};

const successGetToken = (state, { token }) => ({ ...state, token });
const successGetProfileSocial = (state, { profile }) => ({ ...state, profile });
const logOutUser = state => ({ ...state, token: '', profile: {} });

const handlers = {
  [TYPES.SUCCESS_GET_TOKEN]: successGetToken,
  [TYPES.SUCCESS_GET_PROFILE_SOCIAL]: successGetProfileSocial,
  [TYPES.LOG_OUT_USER]: logOutUser
};

export const reducerAuthUser = createReducer(initState, handlers);
