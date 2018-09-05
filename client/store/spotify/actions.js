import { GET_ACCESS_TOKEN_SPOTIFY, SUCCESS_GET_USER_PROFILE_SPOTIFY } from './types';

export const getAccessTokenSpotify = token => ({
  type: GET_ACCESS_TOKEN_SPOTIFY,
  payload: { token }
});

export const successGetUserProfileSpotify = profile => ({
  type: SUCCESS_GET_USER_PROFILE_SPOTIFY,
  payload: { profile }
});