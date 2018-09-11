import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  email: '',
  password: '',
  token: '',
  profile: {}
};

const createNewUser = (state, { email, password }) => ({ ...state, email, password });
const loginUser = (state, { email, password }) => ({ ...state, email, password });
const successGetToken = (state, { token }) => ({ ...state, token });
const successGetProfileSocial = (state, { profile }) => ({ ...state, profile });

const handlers = {
  [TYPES.CREATE_NEW_USER]: createNewUser,
  [TYPES.LOGIN_USER]: loginUser,
  [TYPES.SUCCESS_GET_TOKEN]: successGetToken,
  [TYPES.SUCCESS_GET_PROFILE_SOCIAL]: successGetProfileSocial
};

export const reducerAuthUser = createReducer(initState, handlers);
