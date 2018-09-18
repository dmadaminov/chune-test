import {
  put, takeEvery, call,
  select
} from 'redux-saga/effects';

import { SUCCESS_GET_USER_ARTISTS } from '../artists/types';
import { errorMessage } from '../error/actions';
import { successGetContentUser } from './actions';
import { getContentToServer } from './utilities/content';
import { getPages, getArtists } from './utilities/selectors';
import { FETCH_MORE_CONTENT_USER } from './types';

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

export function* sagasContent() {
  yield takeEvery([SUCCESS_GET_USER_ARTISTS, FETCH_MORE_CONTENT_USER], getContent);
}
