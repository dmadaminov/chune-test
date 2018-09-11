import { createReducer } from '../../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  token: '',
  profile: {}
};

const successGetTokenSocial = (state, { token }) => ({ ...state, token });

const successGetProfileSocial = (state, { profile }) => ({ ...state, profile });

const handlers = {
  [TYPES.SUCCESS_GET_TOKEN_SOCIAL]: successGetTokenSocial,
  [TYPES.SUCCESS_GET_PROFILE_SOCIAL]: successGetProfileSocial
};

export const reducerAuthUserSocial = createReducer(initState, handlers);
