import { SUCCESS_GET_USER_ARTISTS } from './types';

export const successGetUserArtists = artists => ({
  type: SUCCESS_GET_USER_ARTISTS,
  payload: { artists }
});
