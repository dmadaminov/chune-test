import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  token: '',
  profile: {}
};

const getAccessTokenSpotify = (state, { token }) => ({ ...state, token });

const successGetUserProfileSpotify = (state, { profile }) => ({ ...state, profile });

const handlers = {
  [TYPES.GET_ACCESS_TOKEN_SPOTIFY]: getAccessTokenSpotify,
  [TYPES.SUCCESS_GET_USER_PROFILE_SPOTIFY]: successGetUserProfileSpotify
};

export const reducerSpotify = createReducer(initState, handlers);
