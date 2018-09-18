import { GET_CONTENT_USER, SUCCESS_GET_CONTENT_USER, FETCH_MORE_CONTENT_USER } from './types';

export const getContentUser = () => ({
  type: GET_CONTENT_USER
});
export const successGetContentUser = (artistTracks, contentFeed) => ({
  type: SUCCESS_GET_CONTENT_USER,
  payload: { artistTracks, contentFeed }
});
export const fethcMoreContentUser = () => ({
  type: FETCH_MORE_CONTENT_USER
});
