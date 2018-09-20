import {
  GET_CONTENT_USER, SUCCESS_GET_CONTENT_USER, FETCH_MORE_CONTENT_USER,
  SUCCESS_GET_TOP_TRACKS, SUCCESS_GET_CHUNE_SUPPLY
} from './types';

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
export const successGetTopTracks = topTracks => ({
  type: SUCCESS_GET_TOP_TRACKS,
  payload: { topTracks }
});
export const successGetChuneSupply = topChune => ({
  type: SUCCESS_GET_CHUNE_SUPPLY,
  payload: { topChune }
});
