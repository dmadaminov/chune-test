import {
  put, takeEvery, call,
  select
} from 'redux-saga/effects';

import { SUCCESS_GET_USER_ARTISTS, SUCCESS_FOLLOW_ARTIST } from '../artists/types';
import { errorMessage } from '../error/actions';
import { successGetContentUser, successGetTopTracks, successGetChuneSupply } from './actions';
import { getContentToServer, getTopTracksToServer, getChuneSupplyToServer } from './utilities/content';
import { getPages, getArtists } from './utilities/selectors';
import { FETCH_MORE_CONTENT_USER, SUCCESS_GET_CONTENT_USER, SUCCESS_GET_TOP_TRACKS } from './types';

export function* getContent({ payload }) {
  let artistsFollow = [];
  if (payload) artistsFollow = payload.artists;
  else artistsFollow = yield select(getArtists);
  let follow = false;
  if (artistsFollow.length > 0) follow = true;
  const pages = yield select(getPages);
  try {
    const data = yield call(getContentToServer, follow, pages);
    const artistTracks = data.artist_tracks || [];
    const contentFeed = data.content_feed;
    yield put(successGetContentUser(artistTracks, contentFeed));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}
export function* getTopTracks() {
  try {
    const topTracks = yield call(getTopTracksToServer);
    yield put(successGetTopTracks(topTracks));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}
export function* getChuneSupply() {
  try {
    const topChune = yield call(getChuneSupplyToServer);
    yield put(successGetChuneSupply(topChune));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasContent() {
  yield takeEvery([SUCCESS_GET_USER_ARTISTS, FETCH_MORE_CONTENT_USER, SUCCESS_FOLLOW_ARTIST], getContent);
  yield takeEvery(SUCCESS_GET_CONTENT_USER, getTopTracks);
  yield takeEvery(SUCCESS_GET_TOP_TRACKS, getChuneSupply);
}
