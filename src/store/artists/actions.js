import { SUCCESS_GET_USER_ARTISTS, SUCCESS_GET_INFO_ARTIST } from './types';

export const successGetUserArtists = artists => ({
  type: SUCCESS_GET_USER_ARTISTS,
  payload: { artists }
});
export const successGetInfoArtist = artist => ({
  type: SUCCESS_GET_INFO_ARTIST,
  payload: { artist }
});
